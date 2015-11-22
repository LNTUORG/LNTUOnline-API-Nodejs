/**
 * res_controller.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/20/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var studentAgent = require('../agents/student_agent');
var utils = require('utility');

module.exports = function(target, token, callback) {
	var decode = utils.base64decode(token);
	var sha1 = decode.slice(10, decode.length);
	if (sha1 == utils.sha1('1306030411' + '0123')) {
		studentAgent.main('1306030411', '0123', function(student) {
			callback(student);
		});
	}
};