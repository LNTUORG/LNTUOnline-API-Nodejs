/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_grades = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var dict = {
      studentId: user_id,
      averageCredit: {
        studentId: user_id
      }
    };
    var grades = [];
    var $ = cheerio.load(html);

    var average_info = $('table[class="broken_tab"]', html).eq(0).children('tr').eq(0).children('td').eq(2).text().trim();
    var average_credit = average_info.replace('你获得的平均学分绩是', '').replace('，统计时间为每学期第4周。', '').replace('毕业离校事宜、成绩单打印申请', '').trim();

    if (isNaN(parseFloat(average_credit))) {
      dict.averageCredit.value = 0;
      dict.averageCredit.summary = '暂时无平均学分绩信息'
    } else {
      dict.averageCredit.value = average_credit;
      dict.averageCredit.summary = '您当前的平均学分绩为：' + average_credit;
    }

    var grades_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var keysets = [];

    for (var n = 1; n < grades_temp.length; n++) {
      var grade = {};
      grade.num = grades_temp.eq(n).children('td').eq(0).text().trim();
      grade.year = grades_temp.eq(n).children('td').eq(9).text().trim().substring(0, 4);
      grade.term = grades_temp.eq(n).children('td').eq(9).text().trim().substring(4, 5);
      grade.examType = grades_temp.eq(n).children('td').eq(8).text().trim();

      var key = grade.num + grade.year + grade.term + grade.examType;
      if (keysets.indexOf(key) >= 0) {
        continue;
      }
      keysets.push(key);

      grade.name = grades_temp.eq(n).children('td').eq(1).text().trim();
      grade.serialNum = grades_temp.eq(n).children('td').eq(2).text().trim();
      var sc = grades_temp.eq(n).children('td').eq(3).text().trim();
      grade.score = sc == '' ? '无成绩' : sc;
      grade.credit = grades_temp.eq(n).children('td').eq(4).text().trim();
      grade.testMode = grades_temp.eq(n).children('td').eq(5).text().trim();
      grade.selectType = grades_temp.eq(n).children('td').eq(6).text().trim();
      grade.remarks = grades_temp.eq(n).children('td').eq(7).text().trim();
      grade.studentId = user_id;

      var s = parseFloat(grade.score);
      if (isNaN(s)) {
        if (grade.score == '优秀' || grade.score == '优') {
          grade.level = 'GREAT';
        } else if (grade.score == '差' || grade.score == '下' || grade.score == '不及格' || grade.score == '不合格' || grade.score == '无成绩' || grade.score == '') {
          grade.level = 'UNPASS';
        } else  {
          grade.level = 'NORMAL';
        }
      } else {
        if (s >= 90) {
          grade.level = 'GREAT';
        } else if (s >= 60) {
          grade.level = 'NORMAL';
        } else {
          grade.level = 'UNPASS';
        }
      }
      grades.push(grade);
    }
    dict.courseScores = grades;
    return callback(null, dict);
  });
};

module.exports = analyse_grades;
