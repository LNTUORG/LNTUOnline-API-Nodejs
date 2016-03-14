/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var exam_plan_parser = require('../parser/exam_plan');
var constant = require('../agent/constant');

router.get('/', function (req, res) {
  exam_plan_parser(req.lntu_user_id, req.lntu_password, 'student/exam/index.jsdo', function (err, result) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;
