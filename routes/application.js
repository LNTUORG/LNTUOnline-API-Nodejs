/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var agent = require('../agent/dom_agent');

router.get('/auto-fix', function (req, res) {

  agent.test_speed(function (content) {
    return res.send(content);
  });
});

module.exports = router;
