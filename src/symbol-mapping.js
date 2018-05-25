let p1 = `(".*?")`; //字符串
let p2 = `( == | < | > | != | >= | <= | = |(\\+\\+))`; //红色关键字
let p3 = `(\\/\\/.*?)(\r?\n)`; //注释
let p4 = `(new|typeof|for|if|else|while|return|switch|case|break|continue|default)`; //红色关键字
let p5 = `(function|let|var|const|Promise|then|window|console|log|Math|Date)`; //蓝色关键字
let p6 = `\\(([\\w\\$]+?)\\)`; //橘黄色参数名

module.exports = {
	[p1] : `<font style="color:#E6DB74">$1</font>`, //字符串
	[p2] : `<font style="color:#F92672">$1</font>`, //红色关键字
	[p3] : `<font style="color:#807B66">$1$2</font>`, //注释
	[p4] : `<font style="color:#F92672">$1</font>`, //红色关键字
	[p5] : `<font style="color:#66D9EF">$1</font>`, //蓝色关键字
	[p6] : `(<font style="color:#FD971F">$1</font>)`, //橘黄色参数名
}


