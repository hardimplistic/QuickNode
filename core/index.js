module.exports = function(configure) {

	// Connect to mongodb
	require('./mongoose')(configure);

	// mongodb models
	require('./models')(configure);

	// express
	var app = require('./express')(configure);

	// interceptors
	var interceptors = require('./interceptors')(configure);

	// Combination of interceptor and controller
	require('./controllers')(app, interceptors, configure);

	var port = configure.listenport;

	app.listen(port);

	console.log('application server started on port ' + port);

	exports = module.exports = app;

	// execute server event onec
	require(configure.serverevent)(configure);

}