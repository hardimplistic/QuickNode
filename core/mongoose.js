/*
MongoDB
*/

var mongoose = require('mongoose');

function localConnect(configure){
	console.log('MongoDB Connect To:', configure.db.host, configure.db.post, configure.db.dbname);
	// Connect to mongodb
	var connect = function() {
		mongoose.connect(configure.db.url);
	}
	connect();

	// Error handler
	mongoose.connection.on('error', function(err) {
		console.log(err)
	});

	// Reconnect when closed
	mongoose.connection.on('disconnected', function() {
		connect();
	});
}


module.exports = function(configure) {
	localConnect(configure);
}
