# 项目说明
这是一个**页面代码格式化工具**，可以用于美化我们展示在页面上的代码

## 安装
	npm install code-formater --save-dev

## 使用方法
	

	const codeFormater = require('code-formater');
	codeFormater(path，isrecursion，extname)

#### 举例：
	
	//第一种方式： 指定完整的文件路径
	//将会在index.html所在目录下，生成index-format.html文件
	codeFormater(path(__dirname,'index.html'));
	
	//第二种方式： 指定文件夹路径，默认搜索文件夹内的所有.html文件
	//将会在src目录下，搜索所有html文件，并生成处理后的xxx-format.html文件
	codeFormater(path(__dirname,'../src'));

	//第三种方式： 可以指定进行递归搜索，对目录下所有文件处理
	//将会对src目录进行递归搜索，将所有html文件，并生成处理后的xxx-format.html文件
	codeFormater(path(__dirname,'../src'), true);

	//第四种方式： 默认处理.html文件，如果需要的话，可以指定文件的后缀名
	//将会对src目录进行递归搜索，将所有vue文件，并生成处理后的xxx-format.vue文件
	codeFormater(path(__dirname,'../src'), true, ".vue");

## index.html 内容如下：

### 页面中使用<code-format>标签包裹你的代码

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

## 生成的结果如下：

	<code-format>
		<table style="background: #3f3f3f; cellspacing:0; color:white; font-family: Consolas; padding: 2px 40px 2px 15px; border-radius: 4px;">
			<tr><td><p style="margin:5px 0;"><font style="color:#66D9EF">let</font> a1<font style="color:#F92672">  =  </font>10;</p><p style="margin:5px 0;"><font style="color:#66D9EF">var</font> b2<font style="color:#F92672">  =  </font>99;</p><p style="margin:5px 0;"><font style="color:#F92672">if</font>(a1<font style="color:#F92672">  >  </font>20) {</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;console.log(<font style="color:#FD971F">b2</font>);</p><p style="margin:5px 0;">} <font style="color:#F92672">else</font> <font style="color:#F92672">if</font>(b2<font style="color:#F92672">  ==  </font>99){</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;console.log(<font style="color:#E6DB74">"abc"</font>);</p><p style="margin:5px 0;">}</p><p style="margin:5px 0;"><font style="color:#F92672">for</font>(<font style="color:#66D9EF">let</font> i<font style="color:#F92672">  =  </font>0; i<font style="color:#F92672">  <  </font>99; i<font style="color:#F92672"> ++ </font>) {</p><p style="margin:5px 0;">&nbsp;&nbsp;&nbsp;&nbsp;</p><p style="margin:5px 0;">}</p><p style="margin:5px 0;"></p></td></tr>
		</table>
	</code-format>

## 这是原始页面的效果

![avatar](http://www.miaodongketang.cn/images/code-formater/before.png)

## 这是美化后的效果

![avatar](http://www.miaodongketang.cn/images/code-formater/after.png)
