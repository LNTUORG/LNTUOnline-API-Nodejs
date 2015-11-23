/**
 * index.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/19/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';
var resController = require('../middlewares/res_controller');

module.exports = function(server) {
	server.get('/', function(req, res, next) {
		res.send('Hello World.');
		return next();
	});

	server.post('/account/login', function(req, res, next) {
		let target = 'login';
		let token = {
			userId: req.params.userId,
			password: req.params.password,
			ip_address: req.connection.remoteAddress,
			user_agent: req.rawHeaders[req.rawHeaders.indexOf('User-Agent') + 1]
		}
		resController(target, token, function(result) {
			res.send(result.status, result.json);
		});
		return next();
	});

	server.get('/student/:name', function(req, res, next) {
		let target = 'student';
		let token = req.headers.authorization;
		resController(target, token, function(result) {
			res.send(result.status, result.json);
		});
		return next();
	});
};