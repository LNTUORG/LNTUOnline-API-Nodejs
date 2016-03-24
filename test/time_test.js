/**
 * Created by pupboss on 3/11/16.
 */

var moment = require('moment');

// Date.prototype.addDay = function(num) {

//     if (!isNaN(num)) this.setDate(this.getDate() + parseInt(num));
//     return this;
// }

// console.log(new Date().addDay(30).toISOString());

var str = '2016-02-28 15:40--17:40';
var start_time = str.split('--', 2)[0];
var end_time = start_time.substring(0, 11) + str.split('--', 2)[1];

// console.log(start_time, end_time);
console.log(moment(start_time).format('YYYY-MM-DDTHH:mm:ss.SSSZ'));
