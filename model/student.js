/**
 * student.js
 * lntuolapiv3
 * 
 * Created by Li Jie on 11/14/15.
 * Copyright (c) 2015 PUPBOSS. All rights reserved.
 */

'use strict';

var Student = {
	id: '', // 学号
	name: '', // 姓名
	englishName: '', // 英文名
	idCardType: '', // 证件类型
	idCardNum: '', // 证件号码
	sex: '', // 性别
	college: '', // 学院
	classInfo: '', // 班级
	entranceExamArea: '', // 考区
	entranceExamNum: '', // 入学准考证号码
	foreignLanguage: '', // 外语语种
	admissionTime: '', // 入学日期
	graduationTime: '', // 毕业日期
	homeAddress: '', // 家庭住址
	tel: '', // 联系电话
	studentInfoTableNum: '', // 学籍表号
	whereaboutsAftergraduation: '', // 毕业去向
	nationality: '', // 国籍
	birthplace: '', // 籍贯
	birthday: '', // 出生年月日
	politicalAffiliation: '', // 政治面貌
	travelRange: '', // 乘车区间
	nation: '', // 民族
	major: '', // 专业
	studentType: '', // 学生类型
	entranceExamScore: '', // 高考总分
	graduateSchool: '', // 毕业学校
	admissionNum: '', // 入学录取证号
	admissionType: '', // 入学方式
	educationType: '', // 培养方式
	zipCode: '', // 邮政编码
	email: '', // 电子邮件
	sourceOfStudent: '', // 学生来源
	remarks: '', // 备注
	photoUrl: '', // 头像照片 url
	entranceExams: [], // 高考科目
	educationExperiences: [], // 教育经历
	familys: [] // 家人
};

function EntranceExam() {
	return {
		name: '',
		score: ''
	};
};

function EducationExperience() {
	return {
		startTime: '',
		endTime: '',
		schoolInfo: '',
		witness: ''
	};
};

function Family() {
	return {
		name: '',
		relationship: '',
		politicalAffiliation: '',
		job: '',
		post: '',
		workLocation: '',
		tel: ''
	};
};


exports.Student = Student;
exports.EducationExperience = EducationExperience;
exports.EntranceExam = EntranceExam;
exports.Family = Family;