/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_unpass = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var unpass_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var grades = [];

    var key_set = [];
    for (var n = 1; n < unpass_temp.length; n++) {
      var index = key_set.indexOf(unpass_temp.eq(n).children('td').eq(0).text().trim());
      if (index < 0) {
        var grade = {};
        grade.studentId = user_id;
        grade.num = unpass_temp.eq(n).children('td').eq(0).text().trim();
        grade.name = unpass_temp.eq(n).children('td').eq(1).text().trim();
        grade.serialNum = unpass_temp.eq(n).children('td').eq(2).text().trim();
        grade.credit = unpass_temp.eq(n).children('td').eq(4).text().trim();
        grade.selectType = unpass_temp.eq(n).children('td').eq(8).text().trim();
        grade.records = [];

        var record1 = {};
        record1.year = unpass_temp.eq(n).children('td').eq(9).text().trim().substring(0, 4);
        record1.term = unpass_temp.eq(n).children('td').eq(9).text().trim().substring(4, 5);
        record1.examType = unpass_temp.eq(n).children('td').eq(7).text().trim();
        var sc1 = unpass_temp.eq(n).children('td').eq(3).text().trim();
        record1.score = sc1 == '' ? '无成绩' : sc1;
        record1.remarks = unpass_temp.eq(n).children('td').eq(6).text().trim();

        grade.records.push(record1);
        grades.push(grade);
        key_set.push(grade.num);
      } else {
        var record2 = {};
        record2.year = unpass_temp.eq(n).children('td').eq(9).text().trim().substring(0, 4);
        record2.term = unpass_temp.eq(n).children('td').eq(9).text().trim().substring(4, 5);
        record2.examType = unpass_temp.eq(n).children('td').eq(7).text().trim();
        var sc2 = unpass_temp.eq(n).children('td').eq(3).text().trim();
        record2.score = sc2 == '' ? '无成绩' : sc2;
        record2.remarks = unpass_temp.eq(n).children('td').eq(6).text().trim();

        grades[index].records.push(record2);
      }
    }
    return callback(null, grades);
  });
};

module.exports = analyse_unpass;
