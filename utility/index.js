/**
 * Created by pupboss on 3/11/16.
 */

var config = require('../config');

var crypto = require('crypto'),
  algorithm = 'aes-256-ctr',
  password = config.secret_key;

function encrypt(text){
  var cipher = crypto.createCipher(algorithm, password);
  var crypted = cipher.update(text, 'utf8', 'hex');
  crypted += cipher.final('hex');
  return crypted;
}

function decrypt(text){
  var decipher = crypto.createDecipher(algorithm, password);
  var dec = decipher.update(text, 'hex', 'utf8');
  dec += decipher.final('utf8');
  return dec;
}

Date.prototype.addDay = function (num) {

  this.setDate(this.getDate() + parseInt(num));
  return this;
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt
};
