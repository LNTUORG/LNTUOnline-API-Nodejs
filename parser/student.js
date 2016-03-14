/**
 * Created by pupboss on 3/12/16.
 */
'use strict';

var agent = require('../agent/dom_agent');
var cheerio = require('cheerio');
var moment = require('moment');

var analyse_student = function(user_id, password, target, callback) {

  agent.normal_agent(user_id, password, target, function (err, html) {
    if (err) {
      return callback(err, null);
    }
    var student = {};
    var $ = cheerio.load(html);

    // 基本信息
    var student_temp = $('table[class="infolist_vt"]', html).eq(0).children('tr');

    student.id = student_temp.eq(0).children('td').eq(0).text().trim();
    student.name = student_temp.eq(1).children('td').eq(0).text().trim();
    student.englishName = student_temp.eq(2).children('td').eq(0).text().trim();
    student.idCardType = student_temp.eq(3).children('td').eq(0).text().trim();
    student.idCardNum = student_temp.eq(4).children('td').eq(0).text().trim();
    student.sex = student_temp.eq(5).children('td').eq(0).text().trim();
    student.college = student_temp.eq(6).children('td').eq(0).text().trim();
    student.classInfo = student_temp.eq(7).children('td').eq(0).text().trim();
    student.entranceExamArea = student_temp.eq(8).children('td').eq(0).text().trim();
    student.entranceExamNum = student_temp.eq(9).children('td').eq(0).text().trim();
    student.foreignLanguage = student_temp.eq(10).children('td').eq(0).text().trim();
    student.admissionTime = moment(student_temp.eq(11).children('td').eq(0).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    student.graduationTime = moment(student_temp.eq(12).children('td').eq(0).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    student.homeAddress = student_temp.eq(13).children('td').eq(0).text().trim();
    student.tel = student_temp.eq(14).children('td').eq(0).text().trim();
    student.studentInfoTableNum = student_temp.eq(15).children('td').eq(0).text().trim();
    student.whereaboutsAftergraduation = student_temp.eq(16).children('td').eq(0).text().trim();
    student.remarks = student_temp.eq(17).children('td').eq(0).text().trim();
    student.nationality = student_temp.eq(0).children('td').eq(1).text().trim();
    student.photoUrl = student_temp.eq(0).children('td').eq(2).children('img').attr('src');
    student.birthplace = student_temp.eq(1).children('td').eq(1).text().trim();
    student.birthday = moment(student_temp.eq(2).children('td').eq(1).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    student.politicalAffiliation = student_temp.eq(3).children('td').eq(1).text().trim();
    student.travelRange = student_temp.eq(4).children('td').eq(1).text().trim();
    student.nation = student_temp.eq(5).children('td').eq(1).text().trim();
    student.major = student_temp.eq(6).children('td').eq(1).text().trim();
    student.studentType = student_temp.eq(7).children('td').eq(1).text().trim();
    student.entranceExamScore = student_temp.eq(8).children('td').eq(1).text().trim();
    student.graduateSchool = student_temp.eq(9).children('td').eq(1).text().trim();
    student.admissionNum = student_temp.eq(10).children('td').eq(1).text().trim();
    student.admissionType = student_temp.eq(11).children('td').eq(1).text().trim();
    student.educationType = student_temp.eq(12).children('td').eq(1).text().trim();
    student.zipCode = student_temp.eq(13).children('td').eq(1).text().trim();
    student.email = student_temp.eq(14).children('td').eq(1).text().trim();
    student.sourceOfStudent = student_temp.eq(15).children('td').eq(1).text().trim();

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

      educationExperience.startTime = moment(edus.eq(n).children('td').eq(0).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      educationExperience.endTime = moment(edus.eq(n).children('td').eq(1).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
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
    return callback(null, student);
  });
};

module.exports = analyse_student;
