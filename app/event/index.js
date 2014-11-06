var mongoose = require('mongoose');
var User = mongoose.model('XUser');

// server启动后运行,比如检查mongodb中是否存在必要的数据，如果不存在，则生成数据
module.exports = function(configure) {
	var user = new User();
	user.uname = 'name';
	user.save();
};