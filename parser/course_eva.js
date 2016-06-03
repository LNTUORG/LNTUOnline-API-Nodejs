/**
 * Created by pupboss on 3/13/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_eva = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var eva_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
    var evas = [];

    for (var n = 1; n < eva_temp.length; n++) {
      var eva = {};
      eva.studentId = user_id;
      eva.teacher = eva_temp.eq(n).children('td').eq(0).text().trim();
      var course_str = eva_temp.eq(n).children('td').eq(1).text().trim().replace('(', '\n').replace(')', '').split("\n");
      eva.name = course_str[0];
      eva.num = course_str[1];
      eva.done = eva_temp.eq(n).children('td').eq(2).text().trim() == '已评估';
      if (!eva.done) {
        eva.url = eva_temp.eq(n).children('td').eq(3).children('a').attr('href').replace('./evaindexinfo', 'evaindexinfo');
        eva.evaKey = eva_temp.eq(n).children('td').eq(3).children('a').attr('href').replace('./evaindexinfo', 'evaindexinfo');
      }
      evas.push(eva);
    }
    return callback(null, evas);
  });
};

var analyse_detail = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var $ = cheerio.load(html);

    var eva_form_heads = $('form[name="form1"]', html).eq(0).children('input');

    var post_content = '';
    for (var i = 0; i< eva_form_heads.length; i++) {
      post_content += eva_form_heads.eq(i).attr('name') + '=' + eva_form_heads.eq(i).attr('value') + '&';
    }

    var eva_form_body = $('table[class="infolist_hr"]', html).eq(0).children('tr');
    for (var j = 1; j< eva_form_body.length; j++) {
      var eva_td = eva_form_body.eq(j).children('td').eq(2);
      var eva_td_inputs = eva_td.children('input');

      for (var k = 1; k< 5; k++) {
        post_content += eva_td_inputs.eq(k).attr('name') + '=' + eva_td_inputs.eq(k).attr('value') + '&'
      }
    }
    post_content = post_content.substring(0, post_content.length - 1);
    agent.eva_agent(user_id, password, post_content, function (err, final) {
      return callback(err, final);
    })
  });
};

module.exports = {
  analyse_eva: analyse_eva,
  analyse_detail: analyse_detail
};
