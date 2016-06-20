/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var agent = require('../agent/dom_agent');
var room_schedule_parser = require('../parser/room_schedule');
var constant = require('../agent/constant');
var config = require('../config');
var cors = require('cors');

router.post('/hex-trans', function (req, res) {
  var result = {};
  result.msg = parseInt(req.body['count'], 2).toString(8);
  return res.status(200).json(result);
});

router.get('/auto-fix', function (req, res) {

  agent.test_speed(function (content) {
    return res.send(content);
  });
});

router.post('/v1/room-schedule', cors(), function (req, res) {
  var trusted_arr = ['6', '7', '9', '11', '14'];
  var building_id = req.body['buildingID'];
  var week = req.body['week'];
  var week_day = req.body['weekDay'];

  if (trusted_arr.indexOf(building_id) < 0 || parseInt(week) > 26 || parseInt(week) < 1 || parseInt(week_day) < 1 || parseInt(week_day) > 7) {
    return res.status(400).json({ code: constant.cookie.args_error, message: '' });
  }

  room_schedule_parser(config.admin.user_id, config.admin.password, building_id, week, week_day, 'teacher/teachresource/roomschedule_week.jsdo', function (err, result) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    return res.status(200).json(result);
  })
});

module.exports = router;
