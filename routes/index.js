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

	server.get('/student/:name', function(req, res, next) {
		var token = req.headers.authorization;
		resController('student', token, function(student) {
			res.send(student);
		});
		return next();
	});
};