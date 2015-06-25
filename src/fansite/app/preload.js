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
			if (err) {
				console.error(err);
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
	link.setAttribute('href', 'http://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css');
	document.head.appendChild(link);
	document.getElementById('minimalist').remove();
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
						swapExtraCss();
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