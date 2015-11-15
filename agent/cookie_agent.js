/**
 * Copyright (C) 2015-2016 LNTU.ORG (https://www.lntu.org)
 * Copyright (C) 2013-2015 PUPBOSS. (https://www.pupboss.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
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
		account.baseUrl = urls[2];
		callback(null, urls[2]);
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
				account.cookie = agentConfig.NET_ERROR;
				callback(agentConfig.NET_ERROR);
			}
			let result = res.redirects[0];

			if (result.indexOf('frameset.jsp') > 0) {
				result = result.replace(baseUrl + 'frameset.jsp;jsessionid=', '');
				account.cookie = result;
				callback(null, result);
			} else {
				account.cookie = agentConfig.ACCOUNT_ERROR;
				callback(agentConfig.ACCOUNT_ERROR);
			}
		});
}

exports.main = main;