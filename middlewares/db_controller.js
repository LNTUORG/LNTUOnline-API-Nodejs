/**
 * db_controller.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/23/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var mongodb = require('../models/db');

function insertData(table, data, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection(table, function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			collection.insert(data, {
				safe: true
			}, function(err, user) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, user);
			});
		});
	});
};

exports.insertData = insertData;