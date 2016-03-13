/**
 * Created by pupboss on 3/10/16.
 */
'use strict';

var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
  return res.send('<h2>Hello Node.js<h2>');
});

module.exports = router;
