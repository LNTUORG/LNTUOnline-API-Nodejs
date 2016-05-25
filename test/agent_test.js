/**
 * Created by pupboss on 3/11/16.
 */

var agent = require('../agent/dom_agent');

// agent.just_get_cookie('11', '13', function (err, final) {
//   console.log(err, final);
// });

// agent.normal_agent('013', '021', 'teacher/teachresource/roomschedule_week.jsdo?aid=3&buildingid=14&room=-1&whichweek=3&week=1&Submit=%C8%B7+%B6%A8', function (err, final) {
//   console.log(err, final);
// });

// console.log(parseInt('011110110011111101100100101110000011111000110011111111000111111100011110111100001111100010001111111100111110010000100011110000111110001110111110000011111011100110000111000011111000100011111110001000110110001001000000000000000000000', 2).toString(8));

var parseHex = function (binary_str) {
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
};

console.log(parseHex('100000000100000000000100010000000000000000000010000000010000000000010001000000000000000000000000110000000000000001000100000000000000000000000011000000000000000100010000000000000000000001010000000101000000000000000000000000000000000'));
