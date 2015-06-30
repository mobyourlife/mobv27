var express = require('express'),
	compression = require('compression');

// load config
var config = require('../config');

var server = express();
server.use(compression());
server.use(express.static('./dist/fansite/'));
server.use(express.static('./mock/'));

server.listen(config.fansite.port, function () {
	console.log('[' + (process.env.NODE_ENV || 'development') + '] Server listening on port ' + config.fansite.port);
});