/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var parser = require('../parser/course_eva');

router.get('/', function (req, res) {
  parser(req.lntu_user_id, req.lntu_password, 'eva/index/resultlist.jsdo', function (err, result) {
    if (err) {
      return res.status(400).json({ code: err, message: 'it seems something went wrong' });
    }
    return res.status(200).json(result);
  });

});

//router.get('/do:eva', function (req, res) {
//  //parser(req.lntu_user_id, req.lntu_password, 'student/exam/index.jsdo', function (err, result) {
//  //  if (err) {
//  //    return res.status(400).json({ code: err, message: 'it seems something went wrong' });
//  //  }
//  //  return res.status(200).json(result);
//  //});
//  console.log('haha');
//  return res.status(200).json({ name: 'haha' });
//});

module.exports = router;
