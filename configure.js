/*
Server Level Configuration
*/

var path = require('path');
var rootdir = path.normalize(__dirname)

module.exports = {
	development: {
		// Application Root Folder
		rootdir: rootdir

		// Server start event
		, serverevent: path.join(rootdir, 'app/event')

		// Server port
		, listenport: 8080

		// Views File Path
		, views: path.join(rootdir, 'views')

		// View engine
		, vengine: 'ejs'

		// browser get static file folder
		, staticfile: path.join(rootdir, 'public')

		// Interceptor
		, interceptors : path.join(rootdir, 'app/interceptors')

		// default Interceptor
		//默认拦截器(全局拦截器),可以为null/单独/组
		, defaultinter: 'default'

		// controllers
		, controllers: path.join(rootdir, 'app/controllers')

		// database models
		, models : path.join(rootdir, 'app/models')

		// database
		, db : {
			//url: 'mongodb://localhost/noobjs_dev'
			//mongodb://user:pass@localhost:port/database
			//mongodb://{0}:{1}@{2}:{3}/{4}
			url : 'mongodb://{0}:{1}@{2}:{3}/{4}'.format(DB_USER, DB_PASS, DB_HOST, DB_PORT, DB_NAME)
			
			, user : DB_USER
			, pass : DB_PASS
			, post : DB_PORT
			, host : DB_HOST
			, dbname : DB_NAME

		}

	}
}