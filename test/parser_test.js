/**
 * Created by pupboss on 3/12/16.
 */

var cheerio = require('cheerio');
var fs = require('fs');
var config = require('../config');
var moment = require('moment');

var user_id = '123';
var year = '2016';
var term = '春';

var html = fs.readFileSync('/Users/pupboss/Desktop/html.html').toString();

function parse_room(html) {
  var $ = cheerio.load(html);
  var room_arr = [];
  var total_status_arr = [];
  var info_temp = $('table[class="infolist_tab"]', html).eq(0);
  var class_temp = info_temp.children('tr');
  for (var h = 1; h < class_temp.length; h++) {
    room_arr.push(class_temp.eq(h).children('td').eq(0).text().trim());
  }

  var room_temp = $('table[cellspacing="1"]', html);
  for (var i = 0; i < room_temp.length; i++) {
    var room_status = room_temp.eq(i).children('tr').eq(1).children('td');
    var status_arr = [];
    for (var j = 0; j < room_status.length; j+=2) {
      status_arr.push(room_status.eq(j).text().trim() != '' ? '1' : '0');
    }
    total_status_arr.push(status_arr);
  }
  // var binary_str = '';
  // for (var k = 0; k < room_arr.length; k++) {
  //   var temp_arr = room_arr[k];
  //   for (var l = 0; l < temp_arr.length; l++) {
  //     if (temp_arr[l] != '') {
  //       binary_str += '1';
  //     } else {
  //       binary_str += '0';
  //     }
  //   }
  // }
  var dict_arr = [];
  for (var k = 0; k < room_arr.length; k++) {
    dict_arr.push({name: room_arr[k], status: total_status_arr[k]});
  }
  console.log(dict_arr);
}

function parse_student(html) {
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
  return student;
}

function parse_exam(html) {
  var $ = cheerio.load(html);

  var exam_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
  var plans = [];

  for (var n = 1; n < exam_temp.length; n++) {
    var plan = {};
    plan.studentId = user_id;
    plan.course = exam_temp.eq(n).children('td').eq(0).text().trim();

    try {
      var time_str_arr = exam_temp.eq(n).children('td').eq(1).text().trim().split(' ');
      var arr1 = time_str_arr[1].split('--');
      var time_str = time_str_arr[0];
      plan.startTime = moment(time_str + 'T' + arr1[0] + '+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      plan.endTime = moment(time_str + 'T' + arr1[1] + '+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    } catch (err) {
      console.log(err);
      plan.startTime = moment('1970-01-01T00:00+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
      plan.endTime = moment('1970-01-01T00:00+08:00').format('YYYY-MM-DDTHH:mm:ss.SSSZ');
    }

    plan.location = exam_temp.eq(n).children('td').eq(2).text().trim();
    plans.push(plan);
  }
  return plans;
}

function parse_score(html) {
  var dict = {
    studentId: user_id,
    averageCredit: {
      studentId: user_id
    }
  };
  var grades = [];
  var $ = cheerio.load(html);

  var average_info = $('table[class="broken_tab"]', html).eq(0).children('tr').eq(0).children('td').eq(2).text().trim();
  var average_credit = average_info.replace('你获得的平均学分绩是', '').replace('，统计时间为每学期第4周。', '').replace('毕业离校事宜、成绩单打印申请', '').trim();

  if (isNaN(parseFloat(average_credit))) {
    dict.averageCredit.value = 0;
    dict.averageCredit.summary = '暂时无平均学分绩信息'
  } else {
    dict.averageCredit.value = average_credit;
    dict.averageCredit.summary = '您当前的平均学分绩为：' + average_credit;
  }

  var grades_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
  var keysets = [];

  for (var n = 1; n < grades_temp.length; n++) {
    var grade = {};
    grade.num = grades_temp.eq(n).children('td').eq(0).text().trim();
    grade.year = grades_temp.eq(n).children('td').eq(9).text().trim().substring(0, 4);
    grade.term = grades_temp.eq(n).children('td').eq(9).text().trim().substring(4, 5);
    grade.examType = grades_temp.eq(n).children('td').eq(8).text().trim();

    var key = grade.num + grade.year + grade.term + grade.examType;
    if (keysets.indexOf(key) >= 0) {
      continue;
    }
    keysets.push(key);

    grade.name = grades_temp.eq(n).children('td').eq(1).text().trim();
    grade.serialNum = grades_temp.eq(n).children('td').eq(2).text().trim();
    var sc = grades_temp.eq(n).children('td').eq(3).text().trim();
    grade.score = sc == '' ? '无成绩' : sc;
    grade.credit = grades_temp.eq(n).children('td').eq(4).text().trim();
    grade.testMode = grades_temp.eq(n).children('td').eq(5).text().trim();
    grade.selectType = grades_temp.eq(n).children('td').eq(6).text().trim();
    grade.remarks = grades_temp.eq(n).children('td').eq(7).text().trim();
    grade.studentId = user_id;

    var s = parseFloat(grade.score);
    if (isNaN(s)) {
      if (grade.score == '优秀' || grade.score == '优') {
        grade.level = 'GREAT';
      } else if (grade.score == '差' || grade.score == '下' || grade.score == '不及格' || grade.score == '不合格' || grade.score == '无成绩' || grade.score == '') {
        grade.level = 'UNPASS';
      } else  {
        grade.level = 'NORMAL';
      }
    } else {
      if (s >= 90) {
        grade.level = 'GREAT';
      } else if (s >= 60) {
        grade.level = 'NORMAL';
      } else {
        grade.level = 'UNPASS';
      }
    }
    grades.push(grade);
  }
  dict.courseScores = grades;
  return dict;
}

function parse_class_table(html) {
  var $ = cheerio.load(html);

  var class_temp = $('table[class="infolist_tab"]', html).eq(0).children('tr');
  var class_dict = {
    studentId: user_id,
    firstWeekMondayAt: config.first_week_monday,
    year: year,
    term: term,
    courses: []
  };

  for (var n = 1; n < class_temp.length; n++) {
    var course = {
      num: class_temp.eq(n).children('td').eq(0).text().trim(),
      serialNum: class_temp.eq(n).children('td').eq(1).text().trim(),
      name: class_temp.eq(n).children('td').eq(2).text().trim(),
      teacher: class_temp.eq(n).children('td').eq(3).text().trim(),
      credit: class_temp.eq(n).children('td').eq(4).text().trim(),
      selectType: class_temp.eq(n).children('td').eq(5).text().trim(),
      testMode: class_temp.eq(n).children('td').eq(6).text().trim(),
      examType: class_temp.eq(n).children('td').eq(7).text().trim(),
      timesAndPlaces: []
    };

    var times = $('table[class="none"]', class_temp.eq(n)).eq(0).children('tr');

    //console.log(times.length);
    for (var m = 0; m < times.length; m++) {
      var week_str = times.eq(m).children('td').eq(0).text().trim().replace('单', '').replace('双', '');
      var start_week = '';
      var end_week = '';
      if (week_str == '-') {
        continue;
      }
      start_week = week_str.split('-', 2)[0];
      end_week = week_str.split('-', 2)[1];
      var week_mode = '';
      if (times.eq(m).children('td').eq(0).text().trim().indexOf('单') >= 0) {
        week_mode = 'ODD';
      } else if (times.eq(m).children('td').eq(0).text().trim().indexOf('双') >= 0) {
        week_mode = 'EVEN';
      } else {
        week_mode = 'ALL';
      }
      var week_day = times.eq(m).children('td').eq(1).text().trim();
      if (week_day == '周一') {
        week_day = 'Monday';
      } else if (week_day == '周二') {
        week_day = 'Tuesday';
      } else if (week_day == '周三') {
        week_day = 'Wednesday';
      } else if (week_day == '周四') {
        week_day = 'Thursday';
      } else if (week_day == '周五') {
        week_day = 'Friday';
      } else if (week_day == '周六') {
        week_day = 'Saturday';
      } else if (week_day == '周日') {
        week_day = 'Sunday';
      } else {
        week_day = '';
      }

      var stage = times.eq(m).children('td').eq(2).text().trim();
      if (stage == '第一大节') {
        stage = 1;
      } else if (stage == '第二大节') {
        stage = 2;
      } else if (stage == '第三大节') {
        stage = 3;
      } else if (stage == '第四大节') {
        stage = 4;
      } else if (stage == '第五大节') {
        stage = 5;
      } else {
        stage = '';
      }

      var time = {
        startWeek: start_week,
        endWeek: end_week,
        weekMode: week_mode,
        dayInWeek: week_day,
        room: times.eq(m).children('td').eq(3).text().trim(),
        stage: stage
      };
      course.timesAndPlaces.push(time);
    }
    class_dict.courses.push(course);
  }
  return class_dict;
}

function parse_eva_detail(html) {

  var $ = cheerio.load(html);

  var eva_form_heads = $('form[name="form1"]', html).eq(0).children('input');

  var post_content = {};
  for (var i = 0; i< eva_form_heads.length; i++) {
    post_content[eva_form_heads.eq(i).attr('name')] = eva_form_heads.eq(i).attr('value');
  }

  var eva_form_body = $('table[class="infolist_hr"]', html).eq(0).children('tr');
  for (var j = 1; j< eva_form_body.length; j++) {
    var eva_td = eva_form_body.eq(j).children('td').eq(2);
    var eva_td_inputs = eva_td.children('input');

    for (var k = 1; k< 5; k++) {
      post_content[eva_td_inputs.eq(k).attr('name')] = eva_td_inputs.eq(k).attr('value');
    }
  }
  console.log(post_content);
}

// for (var j = 0; j < 50; j++) {
//   parse_score(html);
//   //parse_exam(html);
//   //parse_class_table(html);
//   //parse_student(html);
// }
// console.log(parse_score(html));
parse_eva_detail(html);
