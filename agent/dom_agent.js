/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var eventproxy = require('eventproxy');
var moment = require('moment');
var charset = require('superagent-charset');
var superagent = require('superagent');
var constant = require('./constant');
var config = require('../config');

charset(superagent);

var base_url_index = 4;

var normal_agent = function (u_id, passwd, target, callback) {

  get_cookie(u_id, passwd, function (err, cookie) {
    if (err) {
      return callback(err, null);
    } else {
      get_dom(target, cookie, function (err, final) {
        return callback(err, final);
      })
    }
  });
};

var eva_agent = function (u_id, passwd, post_body, callback) {

  get_cookie(u_id, passwd, function (err, cookie) {
    if (err) {
      return callback(err, null);
    } else {
      eva_course(cookie, post_body, function (err, final) {
        return callback(err, final);
      });
    }
  });
};

var get_cookie = function (u_id, passwd, callback) {
  superagent
    .post(constant.urls[base_url_index] + 'j_acegi_security_check')
    .send('j_username=' + u_id)
    .send('j_password=' + passwd)
    .timeout(3000)
    .set('Accept', 'application/json')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
    .charset('gbk')
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      var result = res.redirects[0];
      if (result.indexOf('frameset.jsp') > 0) {
        result = result.replace(constant.urls[base_url_index] + 'frameset.jsp;jsessionid=', '');
        return callback(null, result);
      } else {
        return callback(constant.cookie.user_error, null);
      }
    });
};

var eva_course = function (cookie, post_body, callback) {

  superagent
    .post(constant.urls[base_url_index] + 'eva/index/putresult.jsdo')
    .type('form')
    .set('Cookie', 'JSESSIONID=' + cookie)
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
    .charset('gbk')
    .send(post_body)
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      return callback(null, null);
    });
};

var get_dom = function (target, cookie, callback) {
  superagent
    .get(constant.urls[base_url_index] + target)
    .set('Cookie', 'JSESSIONID=' + cookie + '; AJSTAT_ok_times=1')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
    .charset('gbk')
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      var result = res.text;
      if (result.indexOf('综合教务') < 0) {
        return callback(constant.cookie.net_error, null);
      }
      return callback(null, result);
    });
};

var net_speed = function (u_id, passwd, url, callback) {
  superagent
    .post(url + 'j_acegi_security_check')
    .send('j_username=' + u_id)
    .send('j_password=' + passwd)
    .timeout(3000)
    .set('Accept', 'application/json')
    .set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
    .charset('gbk')
    .end(function(err, res) {
      if (err) {
        return callback(constant.cookie.net_error, null);
      }
      var result = res.redirects[0];
      if (result.indexOf('frameset.jsp') > 0) {
        result = result.replace(constant.urls[base_url_index] + 'frameset.jsp;jsessionid=', '');
        return callback(null, result);
      } else {
        return callback(constant.cookie.user_error, null);
      }
    });
};

var test_speed = function (callback) {

  if (!config.admin.enable) {
    return;
  }

  var content = moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ') + '\n\n';
  var results = [];

  var ep = new eventproxy();

  ep.after('test_speed', constant.urls.length, function () {

    results = results.sort(function (a, b) {
      return a.res - b.res;
    });
    base_url_index = constant.urls.indexOf(results[0].url);

    content += '\n\nChange url to index ' + base_url_index + ' : ' + results[0].url + '\n\n';
    return callback(content);
  });
  
  constant.urls.forEach(function (url) {

    var start = new Date();
    net_speed(config.admin.user_id, config.admin.password, url, function (err) {
      var end = new Date();
      var time_diff = end - start;
      if (err) {
        time_diff = '3600';
      }
      content += 'test: ' + url + '\n' + 'speed: ' + time_diff + '(ms)\n\n';
      results.push({ res: time_diff, url: url });
      ep.emit('test_speed');
    })
  });
};

module.exports = {
  normal_agent: normal_agent,
  get_cookie: get_cookie,
  eva_agent: eva_agent,
  test_speed: test_speed,
  base_url_index: base_url_index
};
