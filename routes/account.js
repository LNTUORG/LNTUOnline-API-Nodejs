/**
 * Created by pupboss on 3/11/16.
 */

var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var model = require('../utility/db');
var utility = require('../utility');
var agent = require('../agent/dom_agent');

router.post('/login', function(req, res) {
  var user = {
    id: req.body['userId'],
    login_token: uuid.v4(),
    password: req.body['password'],
    type: '',
    update_at: new Date().toISOString(),
    expires_at: new Date().addDay(30).toISOString(),
    ip_address: req.ip,
    user_agent: req.useragent['source']
  };

  if (req.body['userId'].length == 10) {
    user.type = 'STUDENT'
  } else {
    user.type = 'TEACHER'
  }
  res.contentType('application/json');
  agent.just_get_cookie(req.body['userId'], req.body['password'], function (err) {
    if (err) {
      res.status(400).json({code: err, message: 'it seems something went wrong'});
    }
    model.user_model.find({ id: user.id }, function (error) {
      if(error){
        user.create_at = new Date().toISOString();
        user.save();
      }else{
        model.user_model.update({ id: user.id }, user, function (error, docs) {

        });
      }
    });
    res.status(200).json({
      userId: user.id,
      loginToken: user.login_token,
      expiresAt: user.expires_at,
      userType: user.type
    });
  });
});

module.exports = router;