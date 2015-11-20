
var superagent = require('superagent-charset');

var agentConfig = require('./agent_config');

var getCookieValue = function(userId, password, callback) {
    superagent.post(agentConfig.urls[agentConfig.urlIndex] + '/j_acegi_security_check')
        .type('form')
        .send({
            'j_username': userId,
            'j_password': password
        })
        .timeout(agentConfig.timeout)
        .charset('gbk')
        .redirects(0)
        .end(function(err, res) {
            if (res !== undefined && res.statusCode === 302) {
                if (res.headers['location'].indexOf('login_error') === -1) {
                    var cookieValue = res.headers['set-cookie'].join().match(/JSESSIONID=(.*);/)[1];
                    callback({
                        ok: true,
                        status: 200,
                        message: '登录成功',
                        data: cookieValue
                    });
                } else {
                    callback({
                        ok: false,
                        status: 400,
                        message: '用户ID不存在或者密码错误'
                    });
                }
            } else {
                callback({
                    ok: false,
                    status: 500,
                    message: '远程代理调用失败'
                });
            }
        });
};

exports.getCookieValue = getCookieValue;
