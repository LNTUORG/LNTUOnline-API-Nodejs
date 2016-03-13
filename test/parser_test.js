/**
 * Created by pupboss on 3/12/16.
 */

var cheerio = require('cheerio');
var fs = require('fs');
var moment = require('moment');

var html = fs.readFileSync('/Users/pupboss/Desktop/html.html').toString();

var $ = cheerio.load(html);
var student = {};

var temps = $('table[class="infolist_vt"]', html).eq(0).children('tr');

// 基本信息
student.id = temps.eq(0).children('td').eq(0).text().trim();
student.name = temps.eq(1).children('td').eq(0).text().trim();
student.englishName = temps.eq(2).children('td').eq(0).text().trim();
student.idCardType = temps.eq(3).children('td').eq(0).text().trim();
student.idCardNum = temps.eq(4).children('td').eq(0).text().trim();
student.sex = temps.eq(5).children('td').eq(0).text().trim();
student.college = temps.eq(6).children('td').eq(0).text().trim();
student.classInfo = temps.eq(7).children('td').eq(0).text().trim();
student.entranceExamArea = temps.eq(8).children('td').eq(0).text().trim();
student.entranceExamNum = temps.eq(9).children('td').eq(0).text().trim();
student.foreignLanguage = temps.eq(10).children('td').eq(0).text().trim();
student.admissionTime = moment(temps.eq(11).children('td').eq(0).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
student.graduationTime = moment(temps.eq(12).children('td').eq(0).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
student.homeAddress = temps.eq(13).children('td').eq(0).text().trim();
student.tel = temps.eq(14).children('td').eq(0).text().trim();
student.studentInfoTableNum = temps.eq(15).children('td').eq(0).text().trim();
student.whereaboutsAftergraduation = temps.eq(16).children('td').eq(0).text().trim();
student.remarks = temps.eq(17).children('td').eq(0).text().trim();
student.nationality = temps.eq(0).children('td').eq(1).text().trim();
student.photoUrl = $('img', html)[0].attribs.src;
student.birthplace = temps.eq(1).children('td').eq(1).text().trim();
student.birthday = moment(temps.eq(2).children('td').eq(1).text().trim()).format('YYYY-MM-DDTHH:mm:ss.SSSZ');
student.politicalAffiliation = temps.eq(3).children('td').eq(1).text().trim();
student.travelRange = temps.eq(4).children('td').eq(1).text().trim();
student.nation = temps.eq(5).children('td').eq(1).text().trim();
student.major = temps.eq(6).children('td').eq(1).text().trim();
student.studentType = temps.eq(7).children('td').eq(1).text().trim();
student.entranceExamScore = temps.eq(8).children('td').eq(1).text().trim();
student.graduateSchool = temps.eq(9).children('td').eq(1).text().trim();
student.admissionNum = temps.eq(10).children('td').eq(1).text().trim();
student.admissionType = temps.eq(11).children('td').eq(1).text().trim();
student.educationType = temps.eq(12).children('td').eq(1).text().trim();
student.zipCode = temps.eq(13).children('td').eq(1).text().trim();
student.email = temps.eq(14).children('td').eq(1).text().trim();
student.sourceOfStudent = temps.eq(15).children('td').eq(1).text().trim();


console.log(student);