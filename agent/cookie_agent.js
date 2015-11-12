var agentConfig = require('./agent_config');
var request = require('superagent-charset');
var cheerio = require('cheerio');

function getCookie(userId, password) {
	var baseUrl = agentConfig.getCurrentUrl()
	request
		.post(baseUrl + 'j_acegi_security_check')
		.send('j_username=' + userId)
		.send('j_password=' + password)
		.set('Accept', 'application/json')
		.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
		.charset('gbk')
		.end(function(err, res) {

			if (err) {
				return('error');
			}
			var result = res.redirects[0];

			if (result.indexOf('frameset.jsp')) {
				return(result.replace(baseUrl + 'frameset.jsp;jsessionid=', ''));
			}
		});
}

exports.getCookie = getCookie;