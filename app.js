/**
 * Created by pupboss on 3/10/16.
 */

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());

app.use('/', index);
app.use('/account', account);

var server = app.listen(config.port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});