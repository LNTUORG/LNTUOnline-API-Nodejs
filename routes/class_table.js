/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var class_table_parser = require('../parser/class_table');
var constant = require('../agent/constant');

router.get('/', function (req, res) {
  var year = parseInt(req.query['year']);

  if (req.query['term'] != '春' && req.query['term'] != '秋' || isNaN(year)) {
    return res.status(400).json({ code: constant.cookie.args_error, message: 'Term is not 春 or 秋.' });
  }
  class_table_parser(req.lntu_user_id, req.lntu_password, year, req.query['term'], 'student/currcourse/currcourse.jsdo', function (err, result) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;
