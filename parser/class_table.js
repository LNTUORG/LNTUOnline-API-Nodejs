/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var moment = require('moment');
var config = require('../config');

var analyse_html = function(user_id, password, year, term, target, callback) {

  var y = (parseInt(year) - 1980);
  var t = term == '春' ? 1 : 2;
  target = target + '?year=' + y + '&term=' + t;

  agent.normal_agent(user_id, password, target, function (err, html) {
    console.log(target);
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var temps = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var dict = {
      studentId: '',
      firstWeekMondayAt: 'config.first_week_monday',
      year: 2015,
      term: 1,
      courses: []
    };

    for (var n = 1; n < temps.length; n++) {
      var course = {
        num: temps.eq(n).children('td').eq(0).text().trim(),
        serialNum: temps.eq(n).children('td').eq(1).text().trim(),
        name: temps.eq(n).children('td').eq(2).text().trim(),
        teacher: temps.eq(n).children('td').eq(3).text().trim(),
        credit: temps.eq(n).children('td').eq(4).text().trim(),
        selectType: temps.eq(n).children('td').eq(5).text().trim(),
        testMode: temps.eq(n).children('td').eq(6).text().trim(),
        examType: temps.eq(n).children('td').eq(7).text().trim(),
        timesAndPlaces: []
      };

      var times = $('table[class="none"]', temps.eq(n)).eq(0).children('tr');

      //console.log(times.length);
      for (var m = 0; m < times.length; m++) {
        var week_str = times.eq(m).children('td').eq(0).text().trim().replace('单', '').replace('双', '');
        var start_week = '';
        var end_week = '';
        if (week_str != '-') {
          start_week = week_str.split('-', 2)[0];
          end_week = week_str.split('-', 2)[1];
        }
        var week_mode = '';
        if (times.eq(m).children('td').eq(0).text().trim().indexOf('单') >= 0) {
          week_mode = 'ODD';
        } else if (times.eq(m).children('td').eq(0).text().trim().indexOf('双') >= 0) {
          week_mode = 'EVEN';
        } else {
          week_mode = 'ALL';
        }
        var week_day = times.eq(m).children('td').eq(1).text().trim();
        if (week_day == '周一') {
          week_day = 'Monday';
        } else if (week_day == '周二') {
          week_day = 'Tuesday';
        } else if (week_day == '周三') {
          week_day = 'Wednesday';
        } else if (week_day == '周四') {
          week_day = 'Thursday';
        } else if (week_day == '周五') {
          week_day = 'Friday';
        } else if (week_day == '周六') {
          week_day = 'Saturday';
        } else if (week_day == '周日') {
          week_day = 'Sunday';
        } else {
          week_day = '';
        }

        var stage = times.eq(m).children('td').eq(2).text().trim();
        if (stage == '第一大节') {
          stage = 1;
        } else if (stage == '第二大节') {
          stage = 2;
        } else if (stage == '第三大节') {
          stage = 3;
        } else if (stage == '第四大节') {
          stage = 4;
        } else if (stage == '第五大节') {
          stage = 5;
        } else {
          stage = '';
        }

        var time = {
          startWeek: start_week,
          endWeek: end_week,
          weekMode: week_mode,
          dayInWeek: week_day,
          room: times.eq(m).children('td').eq(3).text().trim(),
          stage: stage
        };
        course.timesAndPlaces.push(time);
      }
      dict.courses.push(course);
    }
    callback(null, dict);
  });
};

module.exports = analyse_html;
