/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var model = require('../utility/db');
var utility = require('../utility');
var constant = require('../agent/constant');

module.exports = function (req, res, next, value) {

  if (req.lntu_type == 'ADMIN') {
    model.user_model.find({ id: value }, function (error, docs) {
      if (docs.length > 0) {
        req.lntu_password = utility.decrypt(docs[0]['password']);
        req.lntu_user_id = docs[0]['id'];
        next();
      } else {
        return res.status(400).json({ code: constant.cookie.args_error, message: '该用户不存在' });
      }
    });
  } else {
    next();
  }
};
