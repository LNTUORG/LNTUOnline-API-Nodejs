/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var parser = require('../parser/extra_score');

router.get('/:name', function (req, res) {
  parser(req.lntu_user_id, req.lntu_password, 'student/queryscore/skilltestscore.jsdo', function (err, result) {
    if (err) {
      return res.status(400).json({ code: err, message: 'it seems something went wrong' });
    }
    return res.status(200).json(result);
  });
});

module.exports = router;
