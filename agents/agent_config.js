/**
 * agent_config.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/13/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var SECRET = 'Wa9-7AX-gL3-YLt';

var HTTP_SETTING = {
	TIME_OUT: 3000
};

var ERROR_INFO = {
	NET_ERROR: 'NET_ERROR',
	ACCOUNT_ERROR: 'ACCOUNT_ERROR'
};

var DB_SETTING = {
	db: 'lntuolapiv3',
	host: 'localhost',
	port: 27017
};

exports.ERROR_INFO = ERROR_INFO;
exports.SECRET = SECRET;
exports.DB_SETTING = DB_SETTING;
exports.HTTP_SETTING = HTTP_SETTING;