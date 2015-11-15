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

var cookieAgent = require('./cookie_agent');
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

var main = function (url, userId, password, callback) {
	account.userId = userId;
	account.password = password;
	domRequest.reqUrl = url;
  async.waterfall([
  	  getAccount,
  	  getDOMTypeNormal
  	],
  	function (err, final) {
  		callback(domRequest.resText);
  });
}

var getAccount = function (callback) {
	cookieAgent.main(account.userId, account.password, function (acc) {
		account = acc;
		callback(null, acc)
  });
};

var getDOMTypeNormal = function (data, callback) {
	request
		.get(account.baseUrl + domRequest.reqUrl)
		.set('Cookie', 'JSESSIONID=' + account.cookie + '; AJSTAT_ok_times=1')
		.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
		.charset('gbk')
		.end(function(err, res) {

			if (err) {
				callback(agentConfig.NET_ERROR);
			}
			let result = res.text;
			if (result.indexOf('学籍管理') > 0) {
				domRequest.resText = result;
				callback(null, result);
			} else {
				domRequest.resText = agentConfig.NET_ERROR;
				callback(agentConfig.NET_ERROR);
			}
		});
};

exports.main = main;