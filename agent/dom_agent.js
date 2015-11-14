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

var cookieAgent = require('./cookie_agent');
var request = require('superagent-charset');

function getDOMTypeNormal(url, userId, password, callback) {

	cookieAgent.getCookie(userId, password, function (cookie) {
		agentConfig.getCurrentUrl(function (baseUrl) {
			request
			  
		});
  });
	agentConfig.getCurrentUrl(function (baseUrl) {
		request
			.post(baseUrl + 'j_acegi_security_check')
			.send('j_username=' + userId)
			.send('j_password=' + password)
			.set('Accept', 'application/json')
			.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
			.charset('gbk')
			.end(function(err, res) {

				if (err) {
					callback('error');
				}
				var result = res.redirects[0];

				if (result.indexOf('frameset.jsp')) {
					cookie = result.replace(baseUrl + 'frameset.jsp;jsessionid=', '');
					callback(cookie);
				}
			});
	});
}