/**
 * Created by pupboss on 4/11/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var config = require('../config');
var constant = require('../agent/constant');
var model = require('../utility/db');

var analyse_room = function(user_id, password, aid, buildingid, whichweek, week, target, callback) {

  target = target + '?aid=' + aid + '&buildingid=' + buildingid + '&room=-1&whichweek=' + whichweek + '&week=' + week + '&Submit=%C8%B7+%B6%A8';
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

    model.useless_class_model.find({ location_id: aid, building_id: buildingid }, function (error, docs) {
      if (error) {
        return callback(constant.cookie.net_error, null);
      } else {
        if (docs.length > 0) {
          var useless_arr = [];
          for (var m = 0; m < docs.length; m++) {
            useless_arr.push(docs[m].class_name);
          }
          for (var k = 0; k < room_arr.length; k++) {
            if (useless_arr.indexOf(room_arr[k]) < 0) {
              dict_arr.push({name: room_arr[k], status: total_status_arr[k]});
            }
          }
        } else {
          for (var l = 0; l < room_arr.length; l++) {
            dict_arr.push({name: room_arr[l], status: total_status_arr[l]});
          }
        }
        var dict = {};
        dict.firstWeekMondayAt = config.first_week_monday;
        dict.results = dict_arr;
        return callback(null, dict);
      }
    });
  });
};

module.exports = analyse_room;
