
/*

1.装载拦截器

2.装载控制器
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

*/

var fs = require('fs');
var path = require('path');
var util = require('util');

//获得指定的拦截器集合
function initInterGroup(inter, interceptors){
	var par = []
	if (inter) {
		if (util.isArray(inter)) {
			for (var k in inter) {
				Array.prototype.push.apply(par, initInterGroup(inter[k], interceptors));
			}
		} else if (inter.constructor === String) {
			if(util.isArray(interceptors[inter])){
				Array.prototype.push.apply(par, initInterGroup(interceptors[inter], interceptors));
			}else{
				if(interceptors[inter]){
					par.push(interceptors[inter])
				}
			}
		}
	}
	return par
}

module.exports = function(app, interceptors, configure) {
	var controller = configure.controllers

	var fpath = ''
	var ctrls = null
	var ctrl = null

	fs.readdirSync(controller).forEach(function(file) {
		if (!file.startsWith('_') && file.endsWith('-controller.js')) {
			fpath = path.join(controller, file)
			ctrls = require(fpath)
			
			for (var key in ctrls) {
				
				ctrl = new ctrls[key]()
				if (ctrl.route && ctrl.func) {
					var par = []
					if(configure.defaultinter){
						//默认拦截器
						Array.prototype.push.apply(par, initInterGroup(configure.defaultinter, interceptors))
					}

					if(ctrl.inter){
						//获得拦截器
						Array.prototype.push.apply(par, initInterGroup(ctrl.inter, interceptors))
						//添加目标执行方法
						par.push(ctrl.func)
					}else{
						if(configure.defaultinter){
							par.push(ctrl.func)
						}else{
							//没有拦截器
							par = ctrl.func
						}
					}
					
					//绑定事件
					if (ctrl.method.toUpperCase() == 'ALL') {
						app.all(ctrl.route, par)
					} else if (ctrl.method.toUpperCase() == 'POST') {
						app.post(ctrl.route, par)
					} else if (ctrl.method.toUpperCase() == 'GET') {
						app.get(ctrl.route, par)
					}
					console.log('    ', file, ' -> ', key, ':', (ctrl.inter ? ctrl.inter : ''))
				}
			}
		}
	})

}