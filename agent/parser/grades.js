/**
 * Created by pupboss on 3/12/16.
 */

var cheerio = require('cheerio');

var analyse_html = function(user_id, html, callback) {

  var dict = {
    studentId: user_id
  };
  var average = {
    studentId: user_id
  };
  var grades = [];
  var $ = cheerio.load(html);

  var average_info = $('table[class="broken_tab"]', html).eq(0).children('tr').eq(0).children('td').eq(2).text().trim();
  var average_credit = average_info.replace('你获得的平均学分绩是', '').replace('，统计时间为每学期第4周。', '').replace('毕业离校事宜、成绩单打印申请', '').trim();

  if (isNaN(parseFloat(average_credit))) {
    average.value = 0;
    average.summary = '暂时无平均学分绩信息'
  } else {
    average.value = average_credit;
    average.summary = '您当前的平均学分绩为：' + average_credit;
  }

  dict.averageCredit = average;

  var temps = $('table[class="infolist_tab"]', html).eq(0).children('tr');
  var keysets = [];

  for (var n = 1; n < temps.length; n++) {
    var grade = {};
    grade.num = temps.eq(n).children('td').eq(0).text().trim();
    grade.year = temps.eq(n).children('td').eq(9).text().trim().substring(0, 4);
    grade.term = temps.eq(n).children('td').eq(9).text().trim().substring(4, 5);
    grade.examType = temps.eq(n).children('td').eq(8).text().trim();

    var key = grade.num + grade.year + grade.term + grade.examType;
    if (keysets.indexOf(key) >= 0) {
      continue;
    }
    keysets.push(key);

    grade.name = temps.eq(n).children('td').eq(1).text().trim();
    grade.serialNum = temps.eq(n).children('td').eq(2).text().trim();
    var sc = temps.eq(n).children('td').eq(3).text().trim();
    grade.score = sc == '' ? '无成绩' : sc;
    grade.credit = temps.eq(n).children('td').eq(4).text().trim();
    grade.testMode = temps.eq(n).children('td').eq(5).text().trim();
    grade.selectType = temps.eq(n).children('td').eq(6).text().trim();
    grade.remarks = temps.eq(n).children('td').eq(7).text().trim();

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
  callback(dict);
};

module.exports = analyse_html;
