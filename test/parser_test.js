/**
 * Created by pupboss on 3/12/16.
 */

var cheerio = require('cheerio');
var fs = require('fs');

var html = fs.readFileSync('/Users/pupboss/Desktop/html.html').toString();

var grades = [];
var $ = cheerio.load(html);



console.log(grades);
