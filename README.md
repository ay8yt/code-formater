# 项目说明
这是一个**页面代码格式化工具**，可以用于美化我们展示在页面上的代码

## 安装
	npm install code-formater --save-dev

## 使用方法

	const codeFormater = require('code-formater');
	codeFormater('index.html');

## index.html 内容如下：
	
	<!DOCTYPE html>
	<html>

		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<title>测试</title>
		</head>

		<body>
	<code-format>
	let a1 = 10;
	var b2 = 99;
	if(a1 > 20) {
		console.log(b2);
	} else if(b2 == 99){
		console.log("abc");
	}
	for(let i = 0; i < 99; i++) {
		
	}

	</code-format>

		</body>
		
		<script></script>	
	</html>

	<script></script>

## 生成的结果如下：

	<!DOCTYPE html>
	<html>

		<head>
			<meta http-equiv="content-type" content="text/html; charset=utf-8" />
			<title>测试</title>
		</head>

		<body>
	<code-format>
		    		<table style="background: #3f3f3f; cellspacing:0; color:white; font-family: Consolas; padding: 2px 40px 2px 15px; border-radius: 4px;">
		    			<tr><td><p style="margin:5px 0;"><font style="color:#66D9EF">let</font> a1<font style="color:#F92672">  =  </font>10;</p><p style="margin:5px 0;"><font style="color:#66D9EF">var</font> b2<font style="color:#F92672">  =  </font>99;</p><p style="margin:5px 0;"><font style="color:#F92672">if</font>(a1<font style="color:#F92672">  >  </font>20) {</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;console.log(<font style="color:#FD971F">b2</font>);</p><p style="margin:5px 0;">} <font style="color:#F92672">else</font> <font style="color:#F92672">if</font>(b2<font style="color:#F92672">  ==  </font>99){</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;console.log(<font style="color:#E6DB74">"abc"</font>);</p><p style="margin:5px 0;">}</p><p style="margin:5px 0;"><font style="color:#F92672">for</font>(<font style="color:#66D9EF">let</font> i<font style="color:#F92672">  =  </font>0; i<font style="color:#F92672">  <  </font>99; i<font style="color:#F92672"> ++ </font>) {</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;</p><p style="margin:5px 0;">}</p><p style="margin:5px 0;"></p></td></tr>
		    		</table>
		    	</code-format>

		</body>
		
		<script></script>	
	</html>

	<script></script>

## 这是原始页面的效果

![avatar](http://www.miaodongketang.cn/images/code-formater/before.png)

## 这是美化后的效果

![avatar](http://www.miaodongketang.cn/images/code-formater/after.png)
