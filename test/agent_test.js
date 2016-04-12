/**
 * Created by pupboss on 3/11/16.
 */

var agent = require('../agent/dom_agent');

// agent.just_get_cookie('11', '13', function (err, final) {
//   console.log(err, final);
// });

agent.normal_agent('013', '021', 'teacher/teachresource/roomschedule_week.jsdo?aid=3&buildingid=14&room=-1&whichweek=3&week=1&Submit=%C8%B7+%B6%A8', function (err, final) {
  console.log(err, final);
});
