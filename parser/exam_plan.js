/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var moment = require('moment');

var analyse_html = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var temps = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var plans = [];

    for (var n = 1; n < temps.length; n++) {
      var plan = {};
      plan.studentId = user_id;
      plan.course = temps.eq(n).children('td').eq(0).text().trim();
      var time_str_arr = temps.eq(n).children('td').eq(1).text().trim().split(' ');
      console.log(time_str_arr);
      var arr1 = time_str_arr[1].split('--');
      var time_str = time_str_arr[0];
      plan.startTime = moment(time_str + 'T' + arr1[0] + '+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      plan.endTime = moment(time_str + 'T' + arr1[1] + '+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      plan.location = temps.eq(n).children('td').eq(2).text().trim();
      plans.push(plan);
    }
    callback(null, plans);
  });
};

module.exports = analyse_html;
