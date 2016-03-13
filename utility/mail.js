/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var config = require('../config');
var nodemailer = require('nodemailer');

var send_to_admin = function(subj, content, callback) {

  var transporter = nodemailer.createTransport({
    host: config.mail.host,
    secureConnection: true,
    port: config.mail.port,
    auth: {
      user: config.mail.user,
      pass: config.mail.pass
    }
  });

  var mail = {
    from: config.mail.from,
    subject: subj,
    to: config.mail.to,
    text: content
  };

  transporter.sendMail(mail, function(error, info){
    if(error) {
      return callback(error, null);
    }
    return callback(null, info.response);
  });
};

module.exports = send_to_admin;
