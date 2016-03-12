/**
 * Created by pupboss on 3/12/16.
 */

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');

var analyse_html = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var student = {};
    var $ = cheerio.load(html);

    // 基本信息
    student.id = $('td', html)[1].children[0].data.trim();
    student.name = $('td', html)[4].children[0].data.trim();
    student.englishName = $('td', html)[6].children[0].data.trim();
    student.idCardType = $('td', html)[8].children[0].data.trim();
    student.idCardNum = $('td', html)[10].children[0].data.trim();
    student.sex = $('td', html)[12].children[0].data.trim();
    student.college = $('td', html)[14].children[0].data.trim();
    student.classInfo = $('td', html)[16].children[0].data.trim();
    student.entranceExamArea = $('td', html)[18].children[0].data.trim();
    student.entranceExamNum = $('td', html)[20].children[0].data.trim();
    student.foreignLanguage = $('td', html)[22].children[0].data.trim();
    student.admissionTime = $('td', html)[24].children[0].data.trim();
    student.graduationTime = $('td', html)[26].children[0].data.trim();
    student.homeAddress = $('td', html)[28].children[0].data.trim();
    student.tel = $('td', html)[30].children[0].data.trim();
    student.studentInfoTableNum = $('td', html)[32].children[0].data.trim();
    student.whereaboutsAftergraduation = $('td', html)[34].children[0].data.trim();
    student.nationality = $('td', html)[2].children[0].data.trim();
    student.birthplace = $('td', html)[5].children[0].data.trim();
    student.birthday = $('td', html)[7].children[0].data.trim();
    student.politicalAffiliation = $('td', html)[9].children[0].data.trim();
    student.travelRange = $('td', html)[11].children[0].data.trim();
    student.nation = $('td', html)[13].children[0].data.trim();
    student.major = $('td', html)[15].children[0].data.trim();
    student.studentType = $('td', html)[17].children[0].data.trim();
    student.entranceExamScore = $('td', html)[19].children[0].data.trim();
    student.graduateSchool = $('td', html)[21].children[0].data.trim();
    student.admissionNum = $('td', html)[23].children[0].data.trim();
    student.admissionType = $('td', html)[25].children[0].data.trim();
    student.educationType = $('td', html)[27].children[0].data.trim();
    student.zipCode = $('td', html)[29].children[0].data.trim();
    student.email = $('td', html)[31].children[0].data.trim();
    student.sourceOfStudent = $('td', html)[33].children[0].data.trim();
    student.remarks = $('td', html)[34].children[0].data.trim();
    student.photoUrl = $('img', html)[0].attribs.src;

    // 高考科目
    var exams = $('table[class="infolist_hr"]', html).eq(0).children('tr');
    student.entranceExams = [];

    for (var n = 1; n < exams.length; n++) {
      var entranceExam = {};
      entranceExam.name = exams.eq(n).children('td').eq(0).text().trim();
      entranceExam.score = exams.eq(n).children('td').eq(1).text().trim();
      student.entranceExams.push(entranceExam);
    }

    // 教育经历
    var edus = $('table[id="resume"]', html).children('tr');
    student.educationExperiences = [];

    for (n = 1; n < edus.length; n++) {
      var educationExperience = {};

      educationExperience.startTime = edus.eq(n).children('td').eq(0).text().trim();
      educationExperience.endTime = edus.eq(n).children('td').eq(1).text().trim();
      educationExperience.schoolInfo = edus.eq(n).children('td').eq(2).text().trim();
      educationExperience.witness = edus.eq(n).children('td').eq(3).text().trim();
      student.educationExperiences.push(educationExperience);
    }

    // 家庭情况
    var families = $('table[id="familyinfo"]', html).children('tr');
    student.familys = [];

    for (n = 1; n < families.length; n++) {
      var family = {};

      family.name = families.eq(n).children('td').eq(0).text().trim();
      family.relationship = families.eq(n).children('td').eq(1).text().trim();
      family.politicalAffiliation = families.eq(n).children('td').eq(2).text().trim();
      family.job = families.eq(n).children('td').eq(3).text().trim();
      family.post = families.eq(n).children('td').eq(4).text().trim();
      family.workLocation = families.eq(n).children('td').eq(5).text().trim();
      family.tel = families.eq(n).children('td').eq(6).text().trim();

      student.familys.push(family);
    }
    callback(null, student);
  });
};

module.exports = analyse_html;
