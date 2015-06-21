var express = require('express');

var server = express();
server.use(express.static('./dist/fansite/'));

server.listen(2700);