
const codeformat = require("../index.js");
const path = require('path');

// console.log(path.basename('xxxx/index.html'))

codeformat(
	path.join(__dirname),
	true //递归
);