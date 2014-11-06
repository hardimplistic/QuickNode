controllers.js
==============

1.装载拦截器

2.装载控制器
<pre>
文件名必须以'-controller.js'结尾
文件名以'_'下划线开头或exports._home的控制器不会被装载
控制器必须按照以下示例实现
例:
exports.home = function() {
	this.method = 'GET';		//监听的请求方式(可以为空,默认为GET)['GET','POST', 'ALL']
	this.inter = ['authority'];	//拦截器(可以为空,默认为[],最好不要和configure.defaultinter中的重复)
	this.route = '/home;		//监听的uri,具体的格式请参照Express
	//具体实现方式
	this.func = function(req, res) {
		// ...
	};
};
</pre>