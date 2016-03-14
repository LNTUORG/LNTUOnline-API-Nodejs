/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var model = require('../utility/db');
var utility = require('../utility');
var agent = require('../agent/dom_agent');
var constant = require('../agent/constant');

router.post('/login', function (req, res) {
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
  agent.get_cookie(req.body['userId'], req.body['password'], function (err) {
    if (err == constant.cookie.user_error) {
      return res.status(400).json({ code: err, message: 'password error' });
    } else if (err == constant.cookie.net_error) {
      return res.status(500).json({ code: err, message: 'The server may be down.' });
    }
    user.password = utility.encrypt(user.password);
    model.user_model.find({ id: user.id }, function (error, docs) {
      if(error || docs.length < 1){
        user.create_at = new Date().toISOString();
        model.user_model.create(user, function (error, docs) {
        });
      }else{
        model.user_model.update({ id: user.id }, user, function (error, docs) {
        });
      }
    });
    return res.status(200).json({
      userId: user.id,
      loginToken: user.login_token,
      expiresAt: user.expires_at,
      userType: user.type
    });
  });
});

module.exports = router;
