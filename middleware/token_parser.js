/**
 * Created by pupboss on 3/11/16.
 */

var model = require('../utility/db');
var utility = require('../utility');

module.exports = function (req, res, next) {

  model.user_model.find({ login_token: req.headers.authorization }, function (error, docs) {
    req.lntu_user_id = '';
    req.lntu_password = '';
    req.lntu_type = '';

    if (error || docs.length < 1){
      res.status(401).json({ code: 'Expired', message: 'Please re-login to get a new token' });
    } else if (docs[0]['expires_at'] < new Date()) {
      res.status(401).json({ code: 'Expired', message: 'Please re-login to get a new token' });
    } else {
      req.lntu_type = docs[0]['type'];
      req.lntu_password = utility.decrypt(docs[0]['password']);
      req.lntu_user_id = docs[0]['id'];
      next();
    }
  });
};
