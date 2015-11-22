/**
 * index.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/19/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var restify = require('restify');
var routes = require('./routes/index');

var server = restify.createServer({
	name: 'LNTUOnline APIv3',
	version: '0.0.1'
});

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(restify.bodyParser());

routes(server);

server.listen(8080, function() {
	console.log('%s listening at %s', server.name, server.url);
});