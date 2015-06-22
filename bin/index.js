var express = require('express'),
	compression = require('compression');

var server = express();
server.use(compression());
server.use(express.static('./dist/fansite/'));
server.use(express.static('./mock/'));

server.listen(2700);