/**
 * Created by pupboss on 3/10/16.
 */
'use strict';

var config = require('./config');
var express = require('express');
var useragent = require('express-useragent');
var body_parser = require('body-parser');
var compression = require('compression');
var token_parser = require('./middleware/token_parser');
var url_parser = require('./middleware/url_parser');
var app = express();

var index = require('./routes/index');
var account = require('./routes/account');
var student = require('./routes/student');
var grades = require('./routes/grades');
var unpass = require('./routes/unpass');
var exam_plan = require('./routes/exam_plan');
var extra_score = require('./routes/extra_score');
var class_table = require('./routes/class_table');
var course_eva = require('./routes/course_eva');
var feedback = require('./routes/feedback');
var appl = require('./routes/application');

app.use(body_parser.urlencoded({ extended: false }));
app.use(useragent.express());
app.use(compression());

app.use('/', index);
app.use('/account', account);
app.use('/application', appl);

app.use(token_parser);
app.param(['id'], url_parser);
app.use('/student/:id', student);
app.use('/grades/:id', grades);
app.use('/unpass-course/:id', unpass);
app.use('/exam-plan/:id', exam_plan);
app.use('/skill-test-score/:id', extra_score);
app.use('/class-table/:id', class_table);
app.use('/course-eva-info/:id', course_eva);
app.use('/feedback', feedback);

var server = app.listen(config.port, function () {

  console.log('LNTUOnline app listening at http://%s:%s', server.address().address, server.address().port);
});
