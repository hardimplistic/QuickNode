
console.log('ENV', process.env);

require('./core/plugins');

// Application Level Configuration
require('./app/R');

// System Level Configuration
// var env = process.env.NODE_ENV || 'development';
var configure = require('./configure')['development'];

// Starting Server
var server = require('./core');
server(configure);