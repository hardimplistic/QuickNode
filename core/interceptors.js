/*

装载拦截器

文件名以'_'下划线开头的拦截器不会被装载

拦截器文件名必须以'-interceptor.js'或'-interceptor-group.js'结尾

例:'log-interceptor.js'/'default-interceptor-group.js',
    其中'log'是拦截器的名称,'default'是拦截器集合的名称

以'-interceptor.js'结尾的拦截器需要实现具体的方法
例:
exports.func = function(req, res, next) {
	next();
};

以'-interceptor-group.js'结尾的拦截器需要指定引用的拦截器名称,指定的顺序就是执行顺序
例:
module.exports = ['log', 'authority'];

使用方法:
在controller的实现中添加'this.inter'属性(可嵌套)
例:
exports.MyConsole = function() {
	// ...
	//this.inter = [['log'], 'authority'];
	//this.inter = ['log', 'authority'];
	this.inter = 'authority';
	// ...
};

*/

var fs = require('fs');
var path = require('path');

module.exports = function(configure) {
	var $inter = configure.interceptors;
	var inters = {};

	var fpath = null;
	var key   = null;
	var inter = null;
	fs.readdirSync($inter).forEach(function(file) {
		if (!file.startsWith('_') && file != 'index.js') {
			fpath = path.join($inter, file);
			inter = require(fpath);
			key = file.substring(0, file.indexOf('-'));
			if (file.endsWith('-interceptor.js')) {
				//单一拦截器
				inters[key] = inter.func;
				console.log('interceptor', key);
			} else if (file.endsWith('-interceptor-group.js')) {
				//拦截器组
				inters[key] = inter;
				console.log('interceptors', key, inter);
			}
		}
	});

	return inters;
};