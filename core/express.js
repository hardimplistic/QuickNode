var express = require('express');
var app = express();

module.exports = function(configure) {
	// all environments
	app.set('port', configure.listenport);
	app.set('views', configure.views);
	app.set('view engine', configure.vengine);
	app.use(express.favicon());
	app.use(express.logger('dev'));
	app.use(express.json());
	app.use(express.urlencoded());
	app.use(express.methodOverride());
	app.use(express.cookieParser('sctalk admin manager'));
	app.use(express.session());
	app.use(app.router);
	app.use(express.static(configure.staticfile));

	// development only
	if ('development' == app.get('env')) {
		app.use(express.errorHandler());
	}

	return app;
}