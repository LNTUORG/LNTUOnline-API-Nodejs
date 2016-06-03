/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var course_eva_parser = require('../parser/course_eva');
var constant = require('../agent/constant');

router.get('/', function (req, res) {
  course_eva_parser.analyse_eva(req.lntu_user_id, req.lntu_password, 'eva/index/resultlist.jsdo', function (err, result) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  });
});

router.post('/do:eva', function (req, res) {
  course_eva_parser.analyse_detail(req.lntu_user_id, req.lntu_password, 'eva/index/' + req.body['evaKey'], function (err, result) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(204).send();
  });
});

module.exports = router;
