/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_eva = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var eva_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var evas = [];

    for (var n = 1; n < eva_temp.length; n++) {
      var eva = {};
      eva.studentId = user_id;
      eva.teacher = eva_temp.eq(n).children('td').eq(0).text().trim();
      var course_str = eva_temp.eq(n).children('td').eq(1).text().trim().replace('(', '\n').replace(')', '').split("\n");
      eva.name = course_str[0];
      eva.num = course_str[1];
      eva.done = eva_temp.eq(n).children('td').eq(2).text().trim() == '已评估';
      if (!eva.done) {
        eva.url = eva_temp.eq(n).children('td').eq(3).text().trim();
      }
      evas.push(eva);
    }
    return callback(null, evas);
  });
};

module.exports = analyse_eva;
