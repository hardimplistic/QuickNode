interceptors.js
===============

装载拦截器

文件名以'_'下划线开头的拦截器不会被装载

拦截器文件名必须以'<code>-interceptor.js</code>'或'<code>-interceptor-group.js</code>'结尾

例:<code>'log-interceptor.js'/'default-interceptor-group.js'</code>,
    其中'log'是拦截器的名称,'default'是拦截器集合的名称

以'-interceptor.js'结尾的拦截器需要实现具体的方法
例:
<pre>
exports.func = function(req, res, next) {
	next();
};
</pre>

以'-interceptor-group.js'结尾的拦截器需要指定引用的拦截器名称,指定的顺序就是执行顺序
例:
module.exports = ['log', 'authority'];

使用方法:
在controller的实现中添加'this.inter'属性(可嵌套)
例:
<pre>
exports.MyConsole = function() {
	// ...
	//this.inter = [['log'], 'authority'];
	//this.inter = ['log', 'authority'];
	this.inter = 'authority';
	// ...
};
</pre>
