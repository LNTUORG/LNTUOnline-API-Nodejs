/**
 * Created by pupboss on 3/11/16.
 */
'use strict';

var constant = {
  cookie: {
    net_error: 'REMOTE_INVOKE_ERROR',
    user_error: 'PASSWORD_ERROR',
    auth_error: 'AUTH_ERROR',
    args_error: 'ARGS_ERROR'
  },
  urls: [
    'http://60.18.131.131:11080/academic/',
    'http://60.18.131.131:11081/academic/',
    'http://60.18.131.131:11180/academic/',    //*
    'http://60.18.131.131:11181/academic/',
    'http://60.18.131.131:11080/newacademic/', //*
    'http://60.18.131.131:11081/newacademic/'
    // 'http://60.18.131.133:11180/newacademic/', //*
    // 'http://60.18.131.133:11181/newacademic/'
  ]
};

module.exports = constant;
