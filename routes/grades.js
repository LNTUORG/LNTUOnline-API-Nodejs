/**
 * Created by pupboss on 3/12/16.
 */

var express = require('express');
var router = express.Router();
var agent = require('../agent/dom_agent');
var parser = require('../agent/parser/grades');

router.get('/:name', function (req, res) {
  agent.normal_agent(req.lntu_user_id, req.lntu_password, 'student/queryscore/queryscore.jsdo', function (err, final) {
    if (err) {
      return res.status(400).json({ code: err, message: 'it seems something went wrong' });
    }
    parser(req.lntu_user_id, final, function (result) {
      return res.status(200).json(result);
    });
  });
});

module.exports = router;
