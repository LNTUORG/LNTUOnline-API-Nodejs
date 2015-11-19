/**
 * Copyright (C) 2015-2016 LNTU.ORG (https://www.lntu.org)
 * Copyright (C) 2013-2015 PUPBOSS. (https://www.pupboss.com)
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License along
 * with this program; if not, write to the Free Software Foundation, Inc.,
 * 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA.
 */

'use strict';

var async = require('async');
var cheerio = require('cheerio');
var domAgent = require('./dom_agent');
var student = require('../model/student');

var info = {
  reqUrl: '',
  userId: '',
  password: ''
};

var laStudent = student.Student;

var main = function(url, userId, password, callback) {
  info.reqUrl = url;
  info.userId = userId;
  info.password = password;
  async.waterfall([
      getDOMTypeNormal,
      analyseHTML
    ],
    function(err, final) {
      callback(laStudent);
    }
  );
};

var getDOMTypeNormal = function(callback) {
  domAgent.main('student/studentinfo/studentinfo.jsdo', '1306030411', '0123', function(html) {
    callback(null, html);
  })
};

var analyseHTML = function(html, callback) {
  var $ = cheerio.load(html);

  // 基本信息
  laStudent.id = String($('td', html)[1].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.name = String($('td', html)[4].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.englishName = String($('td', html)[6].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.idCardType = String($('td', html)[8].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.idCardNum = String($('td', html)[10].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.sex = String($('td', html)[12].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.college = String($('td', html)[14].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.classInfo = String($('td', html)[16].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.entranceExamArea = String($('td', html)[18].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.entranceExamNum = String($('td', html)[20].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.foreignLanguage = String($('td', html)[22].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.admissionTime = String($('td', html)[24].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.graduationTime = String($('td', html)[26].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.homeAddress = String($('td', html)[28].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.tel = String($('td', html)[30].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.studentInfoTableNum = String($('td', html)[32].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.whereaboutsAftergraduation = String($('td', html)[34].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.nationality = String($('td', html)[2].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.birthplace = String($('td', html)[5].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.birthday = String($('td', html)[7].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.politicalAffiliation = String($('td', html)[9].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.travelRange = String($('td', html)[11].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.nation = String($('td', html)[13].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.major = String($('td', html)[15].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.studentType = String($('td', html)[17].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.entranceExamScore = String($('td', html)[19].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.graduateSchool = String($('td', html)[21].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.admissionNum = String($('td', html)[23].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.admissionType = String($('td', html)[25].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.educationType = String($('td', html)[27].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.zipCode = String($('td', html)[29].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.email = String($('td', html)[31].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.sourceOfStudent = String($('td', html)[33].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.remarks = String($('td', html)[34].children[0].data).replace(/(^\s*)|(\s*$)/g, '');
  laStudent.photoUrl = String($('img', html)[0].attribs.src);

  // 高考科目
  var exams = $('table[class="infolist_hr"]', html).html();

  var laEntranceExamArr = [];
  var laEntranceExam;
  $('td', exams).each(function(index, element) {
    if (index % 2 == 0) {
      laEntranceExam = student.EntranceExam();
      laEntranceExam.name = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');

    } else {
      laEntranceExam.score = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
      laEntranceExamArr.push(laEntranceExam);
    }
  });
  laStudent.entranceExams = laEntranceExamArr;

  // 教育经历
  var edus = $('table[id="resume"]', html).html();
  var laEducationExperienceArr = [];
  var laEducationExperience;

  $('td', edus).each(function(index, element) {
    if (index % 4 == 0) {
      laEducationExperience = student.EducationExperience();
      laEducationExperience.startTime = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 4 == 1) {
      laEducationExperience.endTime = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 4 == 2) {
      laEducationExperience.schoolInfo = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 4 == 3) {
      laEducationExperience.witness = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
      laEducationExperienceArr.push(laEducationExperience);
    };
  });
  laStudent.educationExperiences = laEducationExperienceArr;

  // 家庭情况
  var families = $('table[id="familyinfo"]', html).html();
  var laFamilyArr = [];
  var laFamily;

  $('td', families).each(function(index, element) {
    if (index % 7 == 0) {
      laFamily = student.Family();
      laFamily.name = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 1) {
      laFamily.relationship = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 2) {
      laFamily.politicalAffiliation = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 3) {
      laFamily.job = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 4) {
      laFamily.post = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 5) {
      laFamily.workLocation = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
    };
    if (index % 7 == 6) {
      laFamily.tel = element.children[0].data.replace(/(^\s*)|(\s*$)/g, '');
      laFamilyArr.push(laFamily);
    };
  });
  laStudent.familys = laFamilyArr;
  callback(null, laStudent);
}

exports.main = main;