/**
 * test.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/13/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

// var studentAgent = require('./agents/student_agent');
var utils = require('utility');
// var domAgent = require('./agents/dom_agent');
// var cookieAgent = require('./agents/cookie_agent');
// var agentConfig = require('./agents/agent_config');
// var async = require('async');
// var resController = require('./middlewares/res_controller');

// resController('student', 'MTMwNjAzMDQxMTljYjdiMjVhMDk5NTVmOTExNTU5MWZlOTA0OGY1NjUzYTAzYWE0YjE=', function(student) {
// 	console.log(student);
// });

// var x = utils.sha1('13060304110123');
// var xx = utils.base64encode('1306030411' + x);

// var y = utils.base64decode('MTMwNjAzMDQxMTljYjdiMjVhMDk5NTVmOTExNTU5MWZlOTA0OGY1NjUzYTAzYWE0YjE=');
// console.log(y);

// var str = '13060304119cb7b25a09955f9115591fe9048f5653a03aa4b1';
// console.log(str.slice(10, str.length));

// a = { name: '语文', score: '108' };
// b = { name: '数学', score: '106' };
// c = { name: '外语', score: '115' };
// d = { name: '理综', score: '192' };

// arr = [];
// arr.push(a);
// arr.push(b);

// console.log(arr);
// studentAgent.main('1306030411', '0123', function(student) {
// 	console.log(student);
// });

// var a = 'html';

// if ('html' == a) {
// 	console.log('true');
// }

// domAgent.main('student/studentinfo/studentinfo.jsdo', '1306030411', '0123', function(html) {
// 	console.log(html);
// })

// var str = '                            中国';
// console.log(str.replace(/(^\s*)|(\s*$)/g, ''));

// cookieAgent.main('1306030411', '0123', function(account) {
// 	console.log(account)
// });

// async.waterfall([
// 	function(callback) {
// 		agentConfig.getCurrentUrl(function(baseUrl) {
// 			callback(null, baseUrl);
// 		});
// 	},
// 	function(data, callback) {
// 		console.log(data)
// 	}

// ], function(err, result) {

// });

// console.log(agentConfig.HTTP_SETTING.TIME_OUT);

// cookieAgent.main('1306030411', '0123', function(cookie) {
// 	console.log(cookie)
// });
// agentConfig.getCurrentUrl(function(base) {
// 	console.log(base);
// });

// var str = 'http://60.18.131.131:11180/academic/common/security/login.jsp;jsessionid=99D7AD2200204AB9B29FC0C01623A2F3.T55?login_error=1'
// console.log(str)
// console.log(str.indexOf('frameset.jsp'));
// if (str.indexOf('frameset.jsp')) {

// 	result = result.replace(baseUrl + 'frameset.jsp;jsessionid=', '');
// 	callback(null, result);
// }
// if (str) {

// 	console.log('asd')
// }