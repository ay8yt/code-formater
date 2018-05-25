
const app = require('./src/app.js');
const path = require('path');
const utils = require('./util/util.js');

module.exports = function(pattern, isrecursion, extname){
	if(/\.[a-zA-Z]+$/.test(pattern) ) { //后缀名结尾，表示文件
		app.format4single(pattern)
	} else {  //无后缀结尾，表示文件夹
		app.format4batch(pattern, isrecursion, extname);
	}
}