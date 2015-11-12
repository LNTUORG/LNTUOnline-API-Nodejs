var request = require('superagent-charset');
var cheerio = require('cheerio');

var baseUrl = 'http://60.18.131.131:11180/academic/j_acegi_security_check';

request
	.post(baseUrl)
	.send('j_username=1306030411')
	.send('j_password=0123')
	.set('Referer', 'http://60.18.131.131:11180/academic/common/security/login1.jsp')
	.set('Accept', 'application/json')
	.set('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.86 Safari/537.36')
	.charset('gbk')
	.end(function(err, res) {

		if (err) {

			return console.error(err);
		}
		var result = res.redirects[0]

		if (result.indexOf('frameset.jsp')) {
			console.log(result.replace('http://60.18.131.131:11180/academic/frameset.jsp;jsessionid=', ''))
		}
	});