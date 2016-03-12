/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var parser = require('../parser/class_table');

router.get('/:name', function (req, res) {
  parser(req.lntu_user_id, req.lntu_password, req.query['year'], req.query['term'], 'student/currcourse/currcourse.jsdo', function (err, result) {
    if (err) {
      return res.status(400).json({ code: err, message: 'it seems something went wrong' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;
