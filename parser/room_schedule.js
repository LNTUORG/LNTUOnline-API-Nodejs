/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_room = function(user_id, password, buildingid, whichweek, week, target, callback) {

  target = target + '?aid=3&buildingid=' + buildingid + '&room=-1&whichweek=' + whichweek + '&week=' + week + '&Submit=%C8%B7+%B6%A8';
  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var dict = {};
    var $ = cheerio.load(html);
    var room_arr = [];
    var room_temp = $('table[cellspacing="1"]', html);
    for (var i = 0; i < room_temp.length; i++) {
      var room_status = room_temp.eq(i).children('tr').eq(1).children('td');
      var status_arr = [];
      for (var j = 0; j < room_status.length; j+=2) {
        status_arr.push(room_status.eq(j).text().trim());
      }
      room_arr.push(status_arr);
    }
    var binary_str = '';
    for (var k = 0; k < room_arr.length; k++) {
      var temp_arr = room_arr[k];
      for (var l = 0; l < temp_arr.length; l++) {
        if (temp_arr[l] != '') {
          binary_str += '1';
        } else {
          binary_str += '0';
        }
      }
    }
    dict.msg = parseInt(binary_str, 2).toString(8);
    return callback(null, dict);
  });
};

module.exports = analyse_room;
