'use strict';

var request = require('superagent');
var MobApi = require('./mobapi');
var Fansite = require('./fansite');

var thisFansite = new Fansite();

request
	.get(MobApi.method('me'))
	.end(function(err, res) {
		if (err) {
			console.error(err);
			return;
		}

		var obj = JSON.parse(res.text);
		thisFansite.set(obj);
	});