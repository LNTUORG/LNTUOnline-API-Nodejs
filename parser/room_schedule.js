/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var config = require('../config');

var analyse_room = function(user_id, password, buildingid, whichweek, week, target, callback) {

  target = target + '?aid=3&buildingid=' + buildingid + '&room=-1&whichweek=' + whichweek + '&week=' + week + '&Submit=%C8%B7+%B6%A8';
  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);
    var room_arr = [];
    var total_status_arr = [];
    var info_temp = $('table[class="infolist_tab"]', html).eq(0);
    var class_temp = info_temp.children('tr');
    for (var h = 1; h < class_temp.length; h++) {
      room_arr.push(class_temp.eq(h).children('td').eq(0).text().trim());
    }

    var room_temp = $('table[cellspacing="1"]', html);
    for (var i = 0; i < room_temp.length; i++) {
      var room_status = room_temp.eq(i).children('tr').eq(1).children('td');
      var status_arr = [];
      for (var j = 0; j < room_status.length; j+=2) {
        status_arr.push(room_status.eq(j).text().trim() != '' ? '1' : '0');
      }
      total_status_arr.push(status_arr);
    }
    var dict_arr = [];
    for (var k = 0; k < room_arr.length; k++) {
      dict_arr.push({name: room_arr[k], status: total_status_arr[k]});
    }
    var dict = {};
    dict.firstWeekMondayAt = config.first_week_monday;
    dict.results = dict_arr;
    return callback(null, dict);
  });
};

module.exports = analyse_room;
