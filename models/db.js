/**
 * db.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/20/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var agentConfig = require('../agents/agent_config'),
	db = require('mongodb').Db,
	connection = require('mongodb').Connection,
	server = require('mongodb').Server;

module.exports = new db(agentConfig.DB_SETTING.db, new server(agentConfig.DB_SETTING.host, agentConfig.DB_SETTING.port), {
	safe: true
});