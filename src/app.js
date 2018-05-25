const fs = require('fs');
const path = require('path');
const lineReader = require('line-reader');
const {Readable} = require('stream');
const {promisify} = require('util');
const symbolMapping = require('./symbol-mapping.js');

require('colors');

// const readdir = promisify(fs.readdir);
// const readfile = promisify(fs.readFile);

function format4batch(dirname, isrecursion, extname=".html") {
	if( !fs.existsSync(dirname) ) return;

	if(!isrecursion) { //如果不需要递归
		let files = fs.readdirSync(dirname); //读取文件夹的文件列表
	    
	    if(!files || files.length==0) return; //如果是空文件夹，直接返回
	    
	    files.forEach(filename => {
	    	let filepath = path.join(dirname, filename);
	    	let state = fs.stat(filepath, (err, state) => {
	    		if(state.isFile() && filename.endsWith(extname))  {
	    			format4single(path.join(dirname, filename));  //处理单个文件
	    		}
	    	})
	    })
	} else { //需要递归
		let filepaths = []; //所有文件路径
		
		function children(_dirname) {
			let files = fs.readdirSync(_dirname); //读取文件夹的文件列表
			
			if(!files || files.length==0) return;

			files.forEach(filename => {
				let filepath = path.join(_dirname, filename);
	    		let state = fs.statSync(filepath);
	    		if(state.isFile() && filename.endsWith(extname))  {
	    			filepaths.push(filepath);
	    		}
	    		if(state.isDirectory()) children(filepath);
			})
		}
		children(dirname);
		console.log(filepaths);

		filepaths.forEach( filepath => {
			format4single(filepath);
		})
	}
}



function format4single(filepath){
	
	if( !fs.existsSync(filepath) ) return;

	let filedata = fs.readFileSync(filepath, "utf8")

    let totalString = filedata.toString();
    //读取所有code-format代码块
    let codeChunks = getCodeChunks(totalString);

    //处理过的代码块
    let colorfulCodeChunks = {};

    new Promise(async (resolve, reject)=>{
    	for(let index in codeChunks){
    		codestr = codeChunks[index];
        	//代码上色
        	codestr = colorful(codestr);
        	//清除第一个换行，将tab键替换为4个空格
			codestr = codestr.replace(/^(\r)?\n/, '').replace(/\t/g,'&nbsp;&nbsp;&nbsp;&nbsp;');        	
			//为每一行代码包裹P标签,和表格
			codestr = await lineable(codestr);
			//保存
			colorfulCodeChunks[index] = codestr;

			if(Object.keys(colorfulCodeChunks).length == Object.keys(codeChunks).length) {
				//当所有代码块处理完成
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
    	console.log(`完成文件${filepath}的处理`);
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



module.exports = {
	format4single,
	format4batch
}