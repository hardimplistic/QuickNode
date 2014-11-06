var fs = require('fs');
var path = require('path');

module.exports = function(configure) {
	var models = configure.models;
	var fpath = null;
	fs.readdirSync(models).forEach(function(file) {
		if (!file.startsWith('_') && file.endsWith('-model.js') && file != 'index.js') {
			fpath = path.join(models, file);
			require(fpath);
			console.log('model:', file);
		}
	});
};