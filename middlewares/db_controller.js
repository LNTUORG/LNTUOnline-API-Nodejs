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
			var query = {
				userId: data.userId
			};

      collection.find(query).sort({
        time: -1
      }).toArray(function (err, docs) {
        mongodb.close();
        if (err) {
					collection.insert(data, {
						safe: true
					}, function(err, res) {
						mongodb.close();
						if (err) {
							return callback(err);
						}
						callback(null, res);
					});
        }
      });
		});
	});
};

function getData(table, userId, callback) {
	mongodb.open(function(err, db) {
		if (err) {
			return callback(err);
		}
		db.collection(table, function(err, collection) {
			if (err) {
				mongodb.close();
				return callback(err);
			}
			var query = {};
			if (userId) {
				query.userId = userId;
			}
			collection.find(query).sort({
				time: -1
			}).toArray(function(err, docs) {
				mongodb.close();
				if (err) {
					return callback(err);
				}
				callback(null, docs[0]);
			});
		});
	});
};

exports.insertData = insertData;
exports.getData = getData;