/**
 * 调用示例
 */

var cookieAgent = require('./cookie_agent');
var studentAgent = require('./student_agent');

// TODO 替换成你自己的信息
var userId = '********';
var password = '***';

cookieAgent.getCookieValue(userId, password, function(result) {
    if (result.ok) {
        console.log(result.data);
    } else {
        console.log(result);
    }
});

studentAgent.getStudentWrapper(userId, password, function(result) {
   if (result.ok) {
       console.log(result.data);
   } else {
       console.log(result);
   }
});
