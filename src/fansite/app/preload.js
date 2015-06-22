'use strict';

var request = require('superagent');
var MobApi = require('./preload/mobapi');
var View = require('./preload/view');
var Fansite = require('./preload/fansite');

var thisView = new View();
var thisFansite = new Fansite();

thisFansite.changed(function (scope) {
	document.title = scope.name || 'Carregando';
	thisView.updateView(thisFansite);
});

/* load boostrap stylesheet */
var loadCss = function() {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', '/css/bootstrap-fansite.min.css');
	document.head.appendChild(link);
};

/* load app script */
var loadScript = function() {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', '/js/app.min.js');
	document.body.appendChild(script);
}

/* load html layout */
var loadHtml = function() {
	request
		.get(MobApi.template('layout'))
		.end(function (err, res) {
			if (err) {
				console.error(err);
				return;
			}

			/* hide body and set layout html */
			document.body.setAttribute('class', 'mob-hidden');
			document.body.innerHTML = res.text;

			/* set brand name */
			var brand = document.getElementsByClassName('navbar-brand');
			if (brand) {
				brand[0].innerHTML = thisFansite.name || 'Mob Your Life';
			}

			/* apply fade in transition */
			setTimeout(function() {
				document.body.setAttribute('class', 'mob-fadein');
			}, 500);

			/* loading app script */
			loadScript();
		});
};

/* load fansite details */
var loadMe = function() {
	request
		.get(MobApi.method('me'))
		.end(function (err, res) {
			if (err) {
				console.error(err);
				return;
			}

			var obj = JSON.parse(res.text);
			thisFansite.set(obj);
			loadCss();
			loadHtml();
		});
};

loadMe();