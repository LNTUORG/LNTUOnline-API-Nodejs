/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

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

function parse_hex (binary_str) {
  var result = '';
  while (binary_str.length % 3 != 0) {
    binary_str += '0';
  }
  for (var i = 0; i < binary_str.length / 3; i++) {
    var temp_str = binary_str.substring(i * 3, (i + 1) * 3);
    var sum = 0;
    for (var j = 0; j < 3; j++) {
      sum +=  temp_str[j] * Math.pow(2, 2 - j);
    }
    result += sum;
  }
  return result;
}

Date.prototype.addDay = function (num) {

  this.setDate(this.getDate() + parseInt(num));
  return this;
};

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  parse_hex: parse_hex
};
