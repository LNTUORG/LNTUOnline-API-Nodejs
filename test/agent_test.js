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

console.log(parseInt('001100111100010001101111010100110101100010100111001100001100010001000010100111101100011000110001100010000101000000001000000000000001110110000100011100010000100000000', 2).toString(8));
