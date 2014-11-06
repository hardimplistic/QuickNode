exports.test = function() {
	this.method = 'GET';
	this.route = '/test';
	this.inter = [];

	this.func = function(req, res) {
		console.log('Testing!');
		res.send({
			s: 200
		});
	};

};