/**
 * Created by pupboss on 3/13/16.
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
    var scores = [];

    for (var n = 1; n < temps.length; n++) {
      var score = {};
      score.studentId = user_id;
      score.name = temps.eq(n).children('td').eq(0).text().trim();
      score.time = temps.eq(n).children('td').eq(1).text().trim();
      score.score = temps.eq(n).children('td').eq(2).text().trim();
      scores.push(score);
    }
    callback(null, scores);
  });
};

module.exports = analyse_html;
