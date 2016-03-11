/**
 * Created by pupboss on 3/10/16.
 */

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var token_parser = require('./middleware/token_parser');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');
var student = require('./routes/student');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());

app.use('/', index);
app.use('/account', account);

app.use(token_parser);
app.use('/student', student);

var server = app.listen(config.port, function () {

  console.log('Example app listening at http://%s:%s', server.address().address, server.address().port);
});
