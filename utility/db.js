/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = require('../config');
var mongoose = require('mongoose');
var uuid = require('node-uuid');
var db = mongoose.connect(config.db.uri);

db.connection.on("error", function (error) {
  console.log("数据库连接失败：" + error);
});

var user_schema = new mongoose.Schema({
  id: { type: String },
  login_token: { type: String },
  password: { type: String },
  type: { type: String },
  update_at: { type: Date, default: Date.now() },
  expires_at: { type: Date },
  create_at: { type: Date },
  ip_address: { type: String },
  user_agent: { type: String }
});

var user_detail_schema = new mongoose.Schema({
  id: { type: String },
  name: { type: String },
  photo_url: { type: String },
  class_info: { type: String },
  sex: { type: String },
  college: { type: String },
  update_at: { type: Date }
});

var feedback_schema = new mongoose.Schema({
  id: { type: String, default: uuid.v4() },
  user_id: { type: String },
  create_at: { type: Date, default: Date.now() },
  user_agent: { type: String },
  content: { type: String }
});

var push_token_schema = new mongoose.Schema({
  id: { type: String, default: uuid.v4() },
  user_id: { type: String },
  create_at: { type: Date, default: Date.now() },
  push_token: { type: String }
});

var building_schema = new mongoose.Schema({
  location_id: { type: String },
  building_id: { type: String },
  building_name : { type: String, default: '尔雅楼' },
  building_phone : { type: String, default: '133' },
  create_at: { type: Date, default: Date.now() }
});

var useless_class_schema = new mongoose.Schema({
  location_id: { type: String },
  building_id: { type: String },
  class_name : { type: String },
  create_at: { type: Date, default: Date.now() }
});

var auto_send_schema = new mongoose.Schema({
  location_id: { type: String },
  building_id: { type: String },
  send_time : { type: String },
  auto_send : {type: String},
  create_at: { type: Date, default: Date.now() }
});

var user_model = db.model('user', user_schema);
var user_detail_model = db.model('user_detail', user_detail_schema);
var crash_log_model = db.model('crash_log', feedback_schema);
var advice_model = db.model('advices', feedback_schema);
var push_token_model = db.model('push_token', push_token_schema);
var building_model = db.model('building', building_schema);
var useless_class_model = db.model('useless_class', useless_class_schema);
var auto_send_model = db.model('auto_send', auto_send_schema);

module.exports = {
  user_model: user_model,
  user_detail_model: user_detail_model,
  crash_log_model: crash_log_model,
  advice_model: advice_model,
  push_token_model: push_token_model,
  building_model: building_model,
  useless_class_model: useless_class_model,
  auto_send_model: auto_send_model
};
