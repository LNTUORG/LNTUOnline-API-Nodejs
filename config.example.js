/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var config = {
  port: 3000,
  first_week_monday: '2016-02-29T00:00:00.000+08:00',
  server_name: 'xxxx',
  secret_key: 'xxxx',

  db: {
    uri: 'mongodb://root:123@localhost:27017/lntuonlinev2'
  },
  mail: {
    enable: true,
    smtp: 'smtp.x.com',
    from: 'xxx@xx.com',
    username: 'xxx@xx.com',
    password: 'xxxxx'
  },
  admin: {
    enable: true,
    user_id: '133333333',
    password: 'xxxx'
  }
};

module.exports = config;
