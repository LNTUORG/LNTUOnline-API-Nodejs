/**
 * cookie_agent.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/13/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var agentConfig = require('./agent_config');
var request = require('superagent-charset');
var async = require('async');

var account = {
	userId: '',
	password: '',
	baseUrl: '',
	cookie: ''
};

var main = function(userId, password, callback) {
	account.userId = userId;
	account.password = password;
	async.waterfall([
			getBaseUrl,
			getCookie
		],
		function(err, final) {
			callback(account);
		}
	);
};

var getBaseUrl = function(callback) {
	var urls = ['http://60.18.131.131:11080/academic/', 'http://60.18.131.131:11081/academic/', 'http://60.18.131.131:11180/academic/', 'http://60.18.131.131:11181/academic/', 'http://60.18.131.131:11080/newacademic/', 'http://60.18.131.131:11081/newacademic/', 'http://60.18.131.133:11180/newacademic/', 'http://60.18.131.133:11181/newacademic/'];
	setTimeout(function() {
		account.baseUrl = urls[4];
		callback(null, account.baseUrl);
	}, 100);
};

var getCookie = function(baseUrl, callback) {
	request
		.post(baseUrl + 'j_acegi_security_check')
		.send('j_username=' + account.userId)
		.send('j_password=' + account.password)
		.set('Accept', 'application/json')
		.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
		.charset('gbk')
		.end(function(err, res) {
			if (err) {
				account.cookie = agentConfig.ERROR_INFO.NET_ERROR;
				callback();
				return;
			}
			let result = res.redirects[0];

			if (result.indexOf('frameset.jsp') > 0) {
				result = result.replace(baseUrl + 'frameset.jsp;jsessionid=', '');
				account.cookie = result;
				callback();
				return;
			}
			account.cookie = agentConfig.ERROR_INFO.ACCOUNT_ERROR;
			callback();
		});
};

exports.main = main;