## API Document

### Overview

This is an agent of Liaoning Technical University Education Administration System.

### Principle

This proxy just like a spider, when you request in this system, our proxy server would simulate your login, parse the important information, and finally return json to you.

**WARMING: We don't collect your information, once you changed your password the proxy won't work anymore**

### Usage

- Our API obey RESTful Standard strictly
- We use SSL to make it more security

#### ROOT URL

`https://api.online.lntu.org/`

#### Login

- Method: POST
- URI: account/login


- param

| param name | not null | type   | remarks |
| ---------- | -------- | ------ | ------- |
| userId     | yes      | string |         |
| password   | yes      | string |         |

- return:

| param name | type     | remarks                           |
| ---------- | -------- | --------------------------------- |
| userId     | string   |                                   |
| loginToken | string   | save it safely, will be used next |
| expiresAt  | datetime | ISO 8601 format                   |
| userType   | string   | STUDENT / ADMIN / TEACHER         |

- error: Test it on your own

#### Self Information

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: student/~self
- param: nil
- return: [Try it on your own]()
- error: Test it on your own

#### Class Table

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: class-table/~self
- param:

| param name | not null | type   | remarks               |
| ---------- | -------- | ------ | --------------------- |
| year       | yes      | string | 2014 / 2015 and so on |
| term       | yes      | string | 春 / 秋                 |

- return: [Try it on your own](#)
- error: Test it on your own

#### Un-pass Course

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: unpass-course/~self
- param: nil
- return: [Try it on your own](#)
- error: Test it on your own

#### Grades

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: grades/~self
- param: nil
- return: [Try it on your own](#)
- error: Test it on your own
- remarks: Includes your average credit

#### Exam Plan

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: exam-plan/~self
- param: nil
- return: [Try it on your own](#)
- error: Test it on your own

#### Skill Test Score

- Header: Key: "Authorization", Value: loginToken
- Method: GET
- URI: skill-test-score/~self
- param: nil
- return: [Try it on your own](#)
- error: Test it on your own
