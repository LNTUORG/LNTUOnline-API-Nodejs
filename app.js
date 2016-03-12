/**
 * Created by pupboss on 3/10/16.
 */
'use strict';

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var token_parser = require('./middleware/token_parser');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');
var student = require('./routes/student');
var grades = require('./routes/grades');
var unpass = require('./routes/unpass');
var exam_plan = require('./routes/exam_plan');
var extra_score = require('./routes/extra_score');
var class_table = require('./routes/class_table');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());

app.use('/', index);
app.use('/account', account);

app.use(token_parser);
app.use('/student', student);
app.use('/grades', grades);
app.use('/unpass-course', unpass);
app.use('/exam-plan', exam_plan);
app.use('/skill-test-score', extra_score);
app.use('/class-table', class_table);

var server = app.listen(config.port, function () {

  console.log('LNTUOnline app listening at http://%s:%s', server.address().address, server.address().port);
});
