'use strict';

var request = require('superagent');
var MobApi = require('./mobapi');
var View = require('./view');
var Fansite = require('./fansite');

var thisView = new View();
var thisFansite = new Fansite();

thisFansite.changed(function (scope) {
	document.title = scope.title || 'Carregando';
	thisView.updateView(thisFansite);
});

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