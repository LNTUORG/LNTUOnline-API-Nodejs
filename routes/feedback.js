/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var moment = require('moment');
var config = require('../config');
var mail = require('../utility/mail');
var model = require('../utility/db');
var constant = require('../agent/constant');
var student_parser = require('../parser/student');

router.post('/crash-log', function (req, res) {
  var crash = new model.crash_log_model({
    user_id: req.body['userId'],
    user_agent: req.useragent['source'],
    content: req.body['content']
  });
  crash.save();

  if (config.mail.enable) {
    var subj = '';
    subj = subj.concat('【教务在线2.0 ', config.server_name, '】客户端异常');
    var content = '时间: ' + moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ') +
      '\n\n尾巴: ' + req.useragent['source'] +
      '\n\n学号: ' + req.body['userId'] +
      '\n\n内容: ' + req.body['content'];

    mail(subj, content, function (err, final) {
    });
  }
  return res.status(204).send();
});

router.post('/advice', function (req, res) {

  if (req.body['content'] == '') {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'it seems something went wrong' });
  }
  var advice = new model.advice_model({
    user_id: req.lntu_user_id,
    user_agent: req.useragent['source'],
    content: req.body['content']
  });
  advice.save();

  if (config.mail.enable) {
    student_parser(req.lntu_user_id, req.lntu_password, 'student/studentinfo/studentinfo.jsdo', function (err, result) {
      var subj = '';
      subj = subj.concat('【教务在线2.0 ', config.server_name, '】用户反馈');

      var content = '时间: ' + moment().format('YYYY-MM-DDTHH:mm:ss.SSSZ') +
        '\n\n尾巴: ' + req.useragent['source'] +
        '\n\n学号: ' + req.lntu_user_id +
        '\n班级: ' + result['classInfo'] +
        '\n性别: ' + result['sex'] +
        '\n学院: ' + result['college'] +
        '\n姓名: ' + result['name'] +
        '\n照片: ' + result['photoUrl'] +
        '\n\n内容: ' + req.body['content'];

      mail(subj, content, function (err, final) {
      });
    });
  }
  return res.status(204).send();
});

module.exports = router;
