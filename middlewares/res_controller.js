/**
 * res_controller.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/20/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var studentAgent = require('../agents/student_agent');
var cookieAgent = require('../agents/cookie_agent');
var agentConfig = require('../agents/agent_config');
var utils = require('utility');

module.exports = function(target, token, callback) {
	if (target == 'login') {
		cookieAgent.main(token.userId, token.password, function(acc) {
			if (acc.cookie == agentConfig.ERROR_INFO.ACCOUNT_ERROR | acc.cookie == agentConfig.ERROR_INFO.NET_ERROR) {
				let result = {
					code: 'PASSWORD_ERROR',
					message: 'Username or password was wrong.'
				};
				callback({
					status: 400,
					json: result
				});
				return;
			} else {
				let sha1 = utils.sha1(token.userId + token.password);
				let base64 = utils.base64encode(token.userId + sha1);
				let result = {
					userId: token.userId,
					loginToken: base64
				};
				callback({
					status: 200,
					json: result
				});
				return;
			}
		});
		return;
	}
	if (target == 'student') {
		var decode = utils.base64decode(token);
		var sha1 = decode.slice(10, decode.length);
		if (sha1 == utils.sha1('1306030411' + '0123')) {
			studentAgent.main('1306030411', '0123', function(student) {
				callback({
					status: 200,
					json: student
				});
				return;
			});
		}
		return;
	}
};