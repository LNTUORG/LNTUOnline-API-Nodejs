/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var model = require('../utility/db');

router.post('/crash-log', function (req, res) {
  var crash = new model.crash_log_model({
    user_id: req.body['userId'],
    user_agent: req.useragent['source'],
    content: req.body['content']
  });
  crash.save();
  return res.status(204).send();
});

router.post('/advice', function (req, res) {

  if (req.body['content'] == '') {
    return res.status(400).json({ code: 'ARGS_ERROR', message: 'it seems something went wrong' });
  }
  var advice = new model.advice_model({
    user_id: req.lntu_user_id,
    user_agent: req.useragent['source'],
    content: req.body['content']
  });
  advice.save();
  return res.status(204).send();
});

module.exports = router;
