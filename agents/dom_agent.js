/**
 * dom_agent.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/14/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var cookieAgent = require('./cookie_agent');
var agentConfig = require('./agent_config');
var request = require('superagent-charset');
var async = require('async');

var account = {
	userId: '',
	password: '',
	baseUrl: '',
	cookie: ''
};

var domRequest = {
	reqUrl: '',
	resText: ''
};

var main = function(url, userId, password, callback) {
	account.userId = userId;
	account.password = password;
	domRequest.reqUrl = url;
	async.waterfall([
			getAccount,
			getDOMTypeNormal
		],
		function(err, final) {
			callback(domRequest.resText);
		}
	);
};

var getAccount = function(callback) {
	cookieAgent.main(account.userId, account.password, function(acc) {
		account = acc;
		callback(null, account);
	});
};

var getDOMTypeNormal = function(account, callback) {
	if (account.cookie == agentConfig.ERROR_INFO.ACCOUNT_ERROR | account.cookie == agentConfig.ERROR_INFO.NET_ERROR) {
		domRequest.resText = account.cookie;
		callback();
		return;
	}
	request
		.get(account.baseUrl + domRequest.reqUrl)
		.set('Cookie', 'JSESSIONID=' + account.cookie + '; AJSTAT_ok_times=1')
		.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
		.charset('gbk')
		.end(function(err, res) {
			if (err) {
				domRequest.resText = agentConfig.ERROR_INFO.NET_ERROR;
				callback();
				return;
			}
			let result = res.text;
			if (result.indexOf('学籍管理') < 0) {
				domRequest.resText = agentConfig.ERROR_INFO.NET_ERROR;
				callback();
				return;
			}
			domRequest.resText = result;
			callback();
		});
};

exports.main = main;