
var superagent = require('superagent-charset');
var cheerio = require('cheerio');

var agentConfig = require('./agent_config');
var cookieAgent = require('./cookie_agent');

var getStudent = function(cookieValue, callback) {
    superagent.get(agentConfig.urls[agentConfig.urlIndex] + '/student/studentinfo/studentinfo.jsdo')
        .set('Cookie', 'JSESSIONID=' + cookieValue + ';')
        .timeout(agentConfig.timeout)
        .charset('gbk')
        .redirects(0)
        .end(function(err, res) {
            if (res !== undefined && res.ok) {
                var $ = cheerio.load(res.text);
                if ($('title').text().indexOf('学籍管理') === 0) {

                    // 解析Student类型
                    var student = {};

                    // 获取table根元素
                    var tables = $('table');

                    // #基本信息#
                    var trs1 = tables.eq(1).children('tr');

                    student.id = trs1.eq(0).children('td').eq(0).text().trim();
                    student.nationality = trs1.eq(0).children('td').eq(1).text().trim();
                    student.photoUrl = trs1.eq(0).children('td').eq(2).children('img').eq(0).attr('src').trim();

                    student.name = trs1.eq(1).children('td').eq(0).text().trim();
                    student.birthplace = trs1.eq(1).children('td').eq(1).text().trim();
                    
                    student.englishName = trs1.eq(2).children('td').eq(0).text().trim();
                    student.birthday = trs1.eq(2).children('td').eq(1).text().trim();

                    student.idCardType = trs1.eq(3).children('td').eq(0).text().trim();
                    student.politicalAffiliation = trs1.eq(3).children('td').eq(1).text().trim();

                    student.idCardNum = trs1.eq(4).children('td').eq(0).text().trim();
                    student.travelRange = trs1.eq(4).children('td').eq(1).text().trim();

                    student.sex = trs1.eq(5).children('td').eq(0).text().trim();
                    student.nation = trs1.eq(5).children('td').eq(1).text().trim();

                    student.college = trs1.eq(6).children('td').eq(0).text().trim();
                    student.major = trs1.eq(6).children('td').eq(1).text().trim();

                    student.classInfo = trs1.eq(7).children('td').eq(0).text().trim();
                    student.studentType = trs1.eq(7).children('td').eq(1).text().trim();

                    student.entranceExamArea = trs1.eq(8).children('td').eq(0).text().trim();
                    student.entranceExamScore = trs1.eq(8).children('td').eq(1).text().trim();

                    student.entranceExamNum = trs1.eq(9).children('td').eq(0).text().trim();
                    student.graduateSchool = trs1.eq(9).children('td').eq(1).text().trim();

                    student.foreignLanguage = trs1.eq(10).children('td').eq(0).text().trim();
                    student.admissionNum = trs1.eq(10).children('td').eq(1).text().trim();

                    student.admissionTime = trs1.eq(11).children('td').eq(0).text().trim();
                    student.admissionType = trs1.eq(11).children('td').eq(1).text().trim();

                    student.graduationTime = trs1.eq(12).children('td').eq(0).text().trim();
                    student.educationType = trs1.eq(12).children('td').eq(1).text().trim();

                    student.homeAddress = trs1.eq(13).children('td').eq(0).text().trim();
                    student.zipCode = trs1.eq(13).children('td').eq(1).text().trim();

                    student.tel = trs1.eq(14).children('td').eq(0).text().trim();
                    student.email = trs1.eq(14).children('td').eq(1).text().trim();

                    student.studentInfoTableNum = trs1.eq(15).children('td').eq(0).text().trim();
                    student.sourceOfStudent = trs1.eq(15).children('td').eq(1).text().trim();

                    student.whereaboutsAftergraduation = trs1.eq(16).children('td').eq(0).text().trim();

                    student.remarks = trs1.eq(17).children('td').eq(0).text().trim();

                    // #高考科目#
                    var trs2 = tables.eq(3).children('tr');

                    student.exams = [];
                    for (var n = 1; n < trs2.length; n++) {
                        var exam = {};

                        exam.name = trs2.eq(n).children('td').eq(0).text().trim();
                        exam.score = trs2.eq(n).children('td').eq(1).text().trim();

                        student.exams.push(exam);
                    }

                    // #教育经历#
                    var trs3 = tables.eq(5).children('tr');

                    student.expers = [];
                    for (n = 1; n < trs3.length; n++) {
                        var exper = {};

                        exper.startTime = trs3.eq(n).children('td').eq(0).text().trim();
                        exper.endTime = trs3.eq(n).children('td').eq(1).text().trim();
                        exper.schoolInfo = trs3.eq(n).children('td').eq(2).text().trim();
                        exper.witness = trs3.eq(n).children('td').eq(3).text().trim();

                        student.expers.push(exper);
                    }

                    // #家庭情况#
                    var trs4 = tables.eq(7).children('tr');

                    student.familys = [];
                    for (n = 1; n < trs4.length; n++) {
                        var family = {};

                        family.name = trs4.eq(n).children('td').eq(0).text().trim();
                        family.relationship = trs4.eq(n).children('td').eq(1).text().trim();
                        family.politicalAffiliation = trs4.eq(n).children('td').eq(2).text().trim();
                        family.job = trs4.eq(n).children('td').eq(3).text().trim();
                        family.post = trs4.eq(n).children('td').eq(4).text().trim();
                        family.workLocation = trs4.eq(n).children('td').eq(5).text().trim();
                        family.tel = trs4.eq(n).children('td').eq(6).text().trim();

                        student.familys.push(family);
                    }

                    /* TODO 暂时没有找到好的判断方法，所以不解析
                    // #处罚情况 - 这个不一定有，要判断#
                    var trs5 = tables.eq(9).children('tr');

                    student.actions = [];
                    for (n = 1; n < trs5.length; n++) {
                        var action = {};

                        action.level = trs5.eq(n).children('td').eq(0).text().trim();
                        action.createTime = trs5.eq(n).children('td').eq(1).text().trim();
                        action.createReason = trs5.eq(n).children('td').eq(2).text().trim();
                        action.cancelTime = trs5.eq(n).children('td').eq(3).text().trim();
                        action.cancelReason = trs5.eq(n).children('td').eq(4).text().trim();
                        action.state = trs5.eq(n).children('td').eq(5).text().trim();
                        action.remarks = trs5.eq(n).children('td').eq(6).text().trim();

                        student.actions.push(action);
                    }
                    */

                    callback({
                        ok: true,
                        status: 200,
                        message: '调用成功',
                        data: student
                    });
                } else {
                    callback({
                        ok: false,
                        status: 403,
                        message: '您的账户类型不是学生，无法查看该信息'
                    });
                }
            } else if (res !== undefined && res.statusCode === 302 && res.headers['location'].indexOf('login.jsp') > 0) {
                callback({
                    ok: false,
                    status: 401,
                    message: '登录令牌失效，请重新登录'
                });
            } else {
                callback({
                    ok: false,
                    status: 500,
                    message: '远程代理调用失败'
                });
            }
        });
};

exports.getStudent = getStudent;

var getStudentWrapper = function(userId, password, callback) {
    cookieAgent.getCookieValue(userId, password, function(result) {
        if (result.ok) {
            getStudent(result.data, callback);
        } else {
            callback(result);
        }
    })
};

exports.getStudentWrapper = getStudentWrapper;
