'use strict';

var request = require('superagent');

window.thisFansite = {};

/* mob base api */
var BaseStatic = 'http://localhost:2700/';

var MobApi = {
	cache: function (methodName) {
		var uri = BaseStatic + 'cache/' + methodName + '.json';
		return uri;
	},
	template: function (templateName) {
		var uri = BaseStatic + 'templates/' + templateName + '.html';
		return uri;
	}
};

/* load boostrap stylesheet */
var loadCss = function(callback) {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', '/css/bootstrap-fansite.min.css');

	link.addEventListener('load', function () {
		callback();
	});

	document.head.appendChild(link);
};

/* load app script */
var loadScript = function(callback) {
	var script = document.createElement('script');
	script.setAttribute('type', 'text/javascript');
	script.setAttribute('src', '/js/app.js');

	script.addEventListener('load', function () {
		callback();
	});

	document.body.appendChild(script);
}

/* load html layout */
var loadHtml = function(callback) {
	request
		.get(MobApi.template('layout'))
		.end(function (err, res) {
			if (err) {
				console.error(err);
				return;
			}

			callback(res.text);
		});
};

/* show html in page's body */
var showHtml = function (html) {
	document.body.setAttribute('class', 'mob-hidden');
	document.body.innerHTML = html;

	/* apply fade in transition */
	setTimeout(function() {
		document.body.setAttribute('class', 'mob-fadein');
	}, 500);
}

/* load fansite details */
var loadMe = function(fansiteId) {
	request
		.get(MobApi.cache('content/' + fansiteId + '/profile'))
		.end(function (err, res) {
			if (err) {
				console.error(err);
				return;
			}

			window.thisFansite = JSON.parse(res.text);
			document.title = window.thisFansite.facebook.name;

			/* set brand logo */
			var placeholder = document.getElementsByClassName('logo');
			if (placeholder && placeholder.length > 0) {
				var logo = document.createElement('img');
				logo.setAttribute('src', window.thisFansite.logo.path);
				logo.setAttribute('alt', window.thisFansite.facebook.name);
				placeholder[0].appendChild(logo);
			}

			loadCss(function () {
				loadHtml(function (html) {
					loadScript(function () {
						showHtml(html);
					});
				});
			});
		});
};

/* load domain info */
var loadDomain = function() {
	request
		.get(MobApi.cache('domains/' + location.hostname))
		.end(function (err, res) {
			if (err) {
				console.error(err);
				return;
			}

			var obj = JSON.parse(res.text);
			loadMe(obj.id);
		});
};

loadDomain();