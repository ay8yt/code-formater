
const path = require('path');
const fs = require('fs');

let Utils = {
	//递归获取某个目录下所有的文件夹(完整路径)，如果指定了target，则所有名字等于target的文件夹会被筛选出来
	getChildDirs(__path, target) {
// console.log(__path)
		let results = [];
		let files =  fs.readdirSync(__path);
		if(!target)  {
			results.push(__path); 
		}  else if(__path.endsWith(target)) {
			results.push(__path);
		}

		files.forEach(filename => {
			let filepath = path.join(__path,filename);
			let state = fs.statSync(filepath);
			if(state.isDirectory()) {
				results = results.concat( this.getChildDirs(filepath, target) );
			}
		})
		return results;
	},
	//递归获取所有的文件，如果指定文件名称，则筛选出来
	getChildFiles() {

	}
}

// 测试
// console.log( Utils.getChildDirs( path.join(__dirname,"../"), "bb" ) )

module.exports = Utils; 