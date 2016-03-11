/**
 * Created by pupboss on 3/11/16.
 */

var agent = require('../agent/dom_agent');

agent.just_get_cookie('11', '13', function (err, final) {
  console.log(err, final);
});

agent.normal_agent('1302', '11', 'student/studentinfo/studentinfo.jsdo', function (err, final) {
  console.log(err, final);
});
