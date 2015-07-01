'use strict';

var request = require('superagent');

window.thisFansite = {};

/* mob base api */
var BaseApi = 'http://{#config.api.host#}:{#config.api.port#}/api/';
var BaseStatic = '/';

var MobApi = {
	api: function (methodName) {
		var uri = BaseApi + methodName;
		return uri;
	},
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

		/* check if it uses an alternative theme */
		if (thisFansite.theme) {
			var theme = thisFansite.theme.css || thisFansite.theme.colour;
			theme = theme.toLowerCase().replace('/css/themes/', '').replace('.min.css', '');

			if (theme.length > 0) {
				var swatch = document.createElement('link');
				swatch.setAttribute('rel', 'stylesheet');
				swatch.setAttribute('type', 'text/css');
				swatch.setAttribute('href', '/css/themes/' + theme + '.min.css');
				document.head.appendChild(swatch);
			}
		}
	});

	document.head.appendChild(link);
};

/* load html layout */
var loadHtml = function(callback) {
	request
		.get(MobApi.template('layout'))
		.end(function (err, res) {
			if (err || !res.ok) {
				console.error(err || 'Failed loadHtml, trying again...');
				setTimeout(function() {
					loadHtml(callback);
				}, 100);
				return;
			}

			callback(res.text);
		});
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

/* show html in page's body */
var showHtml = function (html) {
	document.body.setAttribute('class', 'mob-hidden');
	document.body.innerHTML = html;

	/* apply fade in transition */
	setTimeout(function() {
		document.body.setAttribute('class', 'mob-fadein');
	}, 500);
}

/* swap extra css */
var swapExtraCss = function () {
	var link = document.createElement('link');
	link.setAttribute('rel', 'stylesheet');
	link.setAttribute('type', 'text/css');
	link.setAttribute('href', '/css/fontmob.min.css');
	document.head.appendChild(link);
	document.getElementById('minimalist').remove();
}

/* load fansite details */
var loadMe = function(fansiteId) {
	request
		.get(MobApi.api(fansiteId + '/profile'))
		.end(function (err, res) {
			if (err || !res.ok) {
				console.error(err || 'Failed loadMe, trying again...');
				setTimeout(function() {
					loadMe(fansiteId);
				}, 100);
				return;
			}

			window.thisFansite = JSON.parse(res.text);
			document.title = window.thisFansite.facebook.name;

			/* set brand logo */
			var placeholder = document.getElementsByClassName('logo');
			if (placeholder && placeholder.length > 0) {
				var logo = document.createElement('img');

				if (window.thisFansite.logo && window.thisFansite.logo.path) {
					logo.setAttribute('src', window.thisFansite.logo.path);
				} else {
					logo.setAttribute('src', window.thisFansite.facebook.picture);
				}

				logo.setAttribute('alt', window.thisFansite.facebook.name);
				placeholder[0].appendChild(logo);
			}

			loadCss(function () {
				loadHtml(function (html) {
					loadScript(function () {
						showHtml(html);
						swapExtraCss();
					});
				});
			});
		});
};

/* load domain info */
var loadDomain = function() {
	request
		.get(MobApi.api('domain/' + location.hostname))
		.end(function (err, res) {
			if (err || !res.ok) {
				console.error(err || 'Failed loadDomain, trying again...');
				setTimeout(function() {
					loadDomain();
				}, 100);
				return;
			}

			var obj = JSON.parse(res.text);

			if (obj) {
				loadMe(obj.ref);
			} else {
				// TODO: página de erro 404
			}
		});
};

loadDomain();