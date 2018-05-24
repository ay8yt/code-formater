const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const {Readable} = require('stream');
const {promisify} = require('util');
const symbolMapping = require('./symbol-mapping.js');

require('colors');

module.exports = function(filepath){
	// console.log(filepath);
	fs.readFile(filepath, (drr, filedata) => {
        let totalString = filedata.toString();
// console.log(totalString);
        //读取所有code-format代码块
        let codeChunks = getCodeChunks(totalString);

// console.log(codeChunks);

        //处理过的代码块
        let colorfulCodeChunks = {};

        new Promise(async (resolve, reject)=>{
        	for(let index in codeChunks){
        		codestr = codeChunks[index];
	        	//代码上色
	        	codestr = colorful(codestr);
// console.log(codestr)
	        	//清除第一个换行，将tab键替换为4个空格
				codestr = codestr.replace(/^(\r)?\n/, '').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');        	
				//为每一行代码包裹P标签,和表格
				codestr = await lineable(codestr);
				//保存
				colorfulCodeChunks[index] = codestr;

				if(Object.keys(colorfulCodeChunks).length == Object.keys(codeChunks).length) {
					console.log(Object.keys(colorfulCodeChunks).length , Object.keys(codeChunks).length)
					resolve();
				}
        	}
        })
        .then(() => {
			//替换整体内容，写入新文件
			let finalstr = totalString;
			for(let index in colorfulCodeChunks) {
				codestr = colorfulCodeChunks[index];
				finalstr = finalstr.replace(codeChunks[index], codestr);
			}
        	createFile( filepath, finalstr);
        })
    })
}

function colorful(data) {
	for(let reg in symbolMapping) {
// console.log(typeof reg)
		data = data.replace(new RegExp(reg, 'g'), symbolMapping[reg]);
// console.log(data);
	}

	return data;
}

function getCodeChunks(data) {
	let reg  = /<code-format>((.|\.|\n|\r)*?)<\/code-format>/g;
	let result = null;
	let temp = {};
	let index = 0;
	while( (result=reg.exec(data)) != null ) {
		// console.log(result[1]);
		temp[index++] = result[1];
	}
	return temp;
}


//生成P标签和TABLE标签
const eachLine = promisify(lineReader.eachLine);
function lineable(data){
	let stream = new Readable();
	stream._read = function(size){
        stream.push(data);
        stream.push(null);
	}

	let codestr = "";
	
	return new Promise((resolve)=> {
	    eachLine(stream, line => {
	    	codestr += '<p style="margin:5px 0;">'+line+'</p>';
// console.log("------"+line.yellow);
	    }).then( () => {
	    	resolve(`
	    		<table style="background: #3f3f3f; cellspacing:0; color:white; font-family: Consolas; padding: 2px 40px 2px 15px; border-radius: 4px;">
	    			<tr><td>${codestr}</td></tr>
	    		</table>
	    	`);
	    });
	})	
}

function createFile(filepath, data){

	fs.writeFileSync( path.join(path.dirname(filepath),  path.basename(filepath,".html")+"-format"+path.extname(filepath) ) , data);
}

