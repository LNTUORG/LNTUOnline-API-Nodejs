/**
 * Created by pupboss on 3/12/16.
 */

var cheerio = require('cheerio');

var analyse_html = function(html, callback) {

  var grades = [];
  var $ = cheerio.load(html);

  var temps = $('table[class="infolist_tab"]', html).eq(0).children('tr');
  var keysets = [];

  for (var n = 1; n < temps.length; n++) {
    var grade = {};
    grade.num = temps.eq(n).children('td').eq(0).text().trim();
    grade.year = temps.eq(n).children('td').eq(9).text().trim().substring(4, 5);
    grade.term = temps.eq(n).children('td').eq(9).text().trim().substring(0, 4);
    grade.examType = temps.eq(n).children('td').eq(8).text().trim();

    var key = grade.num + grade.year + grade.term + grade.examType;
    if (keysets.indexOf(key) > 0) {
      continue;
    }
    keysets.push(key);

    grade.name = temps.eq(n).children('td').eq(1).text().trim();
    grade.serialNum = temps.eq(n).children('td').eq(2).text().trim();
    grade.score = temps.eq(n).children('td').eq(3).text().trim();
    grade.credit = temps.eq(n).children('td').eq(4).text().trim();
    grade.testMode = temps.eq(n).children('td').eq(5).text().trim();
    grade.selectType = temps.eq(n).children('td').eq(6).text().trim();
    grade.remarks = temps.eq(n).children('td').eq(7).text().trim();
    grade.level = temps.eq(n).children('td').eq(10).text().trim();

    grades.push(grade);
  }
  callback(grades);
};

module.exports = analyse_html;
