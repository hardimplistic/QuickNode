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