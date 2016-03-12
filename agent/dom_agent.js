/**
 * Created by pupboss on 3/11/16.
 */

var async = require('async');
var charset = require('superagent-charset');
var request = require('superagent');
var constant = require('./constant');
charset(request);

var base_url = 'http://60.18.131.131:11080/newacademic/';
var login_url = 'http://60.18.131.131:11080/newacademic/j_acegi_security_check';
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
    callback(err, final);
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
      callback(null, result);
    });
};

module.exports = {
  normal_agent: normal_agent,
  just_get_cookie: just_get_cookie
};
