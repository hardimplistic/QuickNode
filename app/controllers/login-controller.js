var mongoose = require('mongoose');
var User = mongoose.model('XUser');

exports.index = function() {
	this.method = 'POST';
	this.route = '/index';

	this.func = function(req, res) {
		User.list({}, function(err, users) {
			res.send(users);
		});
	};
};