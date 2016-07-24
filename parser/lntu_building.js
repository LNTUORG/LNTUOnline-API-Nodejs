/**
 * Created by pupboss on 7/24/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_location = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);
    var location_arr = [];

    var location_all = $('select[name="aid"]', html).eq(0).children('option');
    for (var i = 1; i < location_all.length; i++) {
      var location = {};
      location.location_name = location_all.eq(i).text().trim();
      location.location_id = location_all.eq(i).attr('value');
      location_arr.push(location);
    }
    return callback(null, location_arr);
  });
};

var analyse_building = function(user_id, password, location_id, callback) {

  agent.normal_agent(user_id, password, 'teacher/teachresource/roomschedulequery.jsdo?aid=' + location_id + '&buildingid=-1&room=-1&whichweek=-1&week=1', function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);
    var building_arr = [];

    var building_all = $('select[name="buildingid"]', html).eq(0).children('option');
    for (var i = 1; i < building_all.length; i++) {
      var building = {};
      building.building_name = building_all.eq(i).text().trim();
      building.building_id = building_all.eq(i).attr('value');
      building.location_id = location_id;
      building_arr.push(building);
    }
    return callback(null, building_arr);
  });
};

module.exports = {
  analyse_location: analyse_location,
  analyse_building: analyse_building
};