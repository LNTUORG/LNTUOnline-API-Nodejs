/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var async = require('async');
var eventproxy = require('eventproxy');
var moment = require('moment');
var charset = require('superagent-charset');
var request = require('superagent');
var constant = require('./constant');
var config = require('../config');
var mail = require('../utility/mail');

charset(request);

var base_url_index = 4;
var base_url = constant.urls[base_url_index];
var login_url = base_url + 'j_acegi_security_check';
var uri = '';
var user_id = '';
var password = '';

var normal_agent = function (u_id, passwd, target, callback) {
  uri = base_url + target;
  user_id = u_id;
  password = passwd;
  async.waterfall([
    get_cookie,
    get_dom
  ], function (err, final) {
    return callback(constant.cookie.net_error, final);
  });
};

var just_get_cookie = function (u_id, passwd, callback) {
  user_id = u_id;
  password = passwd;
  get_cookie(callback);
};

var get_cookie = function (callback) {
  request
    .post(login_url)
    .send('j_username=' + user_id)
    .send('j_password=' + password)
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
        result = result.replace(base_url + 'frameset.jsp;jsessionid=', '');
        return callback(null, result);
      } else {
        return callback(constant.cookie.user_error, null);
      }
    });
};

var get_dom = function (cookie, callback) {
  request
    .get(uri)
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
  request
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
        result = result.replace(base_url + 'frameset.jsp;jsessionid=', '');
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
    var subj = '';
    subj = subj.concat('【教务在线2.0 ', config.server_name, '】维护日志');
    mail(subj, content, function(err, final) {
    });
    callback(content);
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
  just_get_cookie: just_get_cookie,
  test_speed: test_speed
};
