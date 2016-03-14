/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var model = require('../utility/db');
var utility = require('../utility');
var constant = require('../agent/constant');

module.exports = function (req, res, next) {

  if (!req.headers.authorization) {
    res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is null or is expires.' });
  } else {
    model.user_model.find({ login_token: req.headers.authorization }, function (error, docs) {
      req.lntu_user_id = '';
      req.lntu_password = '';
      req.lntu_type = '';

      if (error || docs.length < 1){
        res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is null or is expires.' });
      } else if (docs[0]['expires_at'] < new Date()) {
        res.status(401).json({ code: constant.cookie.auth_error, message: 'Authorization is null or is expires.' });
      } else {
        req.lntu_type = docs[0]['type'];
        req.lntu_password = utility.decrypt(docs[0]['password']);
        req.lntu_user_id = docs[0]['id'];
        next();
      }
    });
  }
};
