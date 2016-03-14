/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_html = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var temps = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var grades = [];

    var key_set = [];
    for (var n = 1; n < temps.length; n++) {
      var index = key_set.indexOf(temps.eq(n).children('td').eq(0).text().trim());
      if (index < 0) {
        var grade = {};
        grade.studentId = user_id;
        grade.num = temps.eq(n).children('td').eq(0).text().trim();
        grade.name = temps.eq(n).children('td').eq(1).text().trim();
        grade.serialNum = temps.eq(n).children('td').eq(2).text().trim();
        grade.credit = temps.eq(n).children('td').eq(4).text().trim();
        grade.selectType = temps.eq(n).children('td').eq(8).text().trim();
        grade.records = [];

        var record1 = {};
        record1.year = temps.eq(n).children('td').eq(9).text().trim().substring(0, 4);
        record1.term = temps.eq(n).children('td').eq(9).text().trim().substring(4, 5);
        record1.examType = temps.eq(n).children('td').eq(7).text().trim();
        var sc1 = temps.eq(n).children('td').eq(3).text().trim();
        record1.score = sc1 == '' ? '无成绩' : sc1;
        record1.remarks = temps.eq(n).children('td').eq(6).text().trim();

        grade.records.push(record1);
        grades.push(grade);
        key_set.push(grade.num);
      } else {
        var record2 = {};
        record2.year = temps.eq(n).children('td').eq(9).text().trim().substring(0, 4);
        record2.term = temps.eq(n).children('td').eq(9).text().trim().substring(4, 5);
        record2.examType = temps.eq(n).children('td').eq(7).text().trim();
        var sc2 = temps.eq(n).children('td').eq(3).text().trim();
        record2.score = sc2 == '' ? '无成绩' : sc2;
        record2.remarks = temps.eq(n).children('td').eq(6).text().trim();

        grades[index].records.push(record2);
      }
    }
    return callback(null, grades);
  });
};

module.exports = analyse_html;
