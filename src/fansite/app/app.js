var angular = require('angular');
var ngRoute = require('angular-route');

require('./data/module');

angular.module('MobYourLife', [
	'MobYourLife.Data',
	'ngRoute'
])

.config(function ($routeProvider) {
	$routeProvider
		.when('/inicio', {
			templateUrl: '/partials/inicio.html',
			controller: 'HomeCtrl'
		})
		.when('/sobre', {
			templateUrl: '/partials/sobre.html',
			controller: 'SobreCtrl'
		})
		.when('/p/:page', {
			templateUrl: '/partials/textpage.html',
			controller: 'TextPageCtrl'
		})
		.when('/fotos', {
			templateUrl: '/partials/fotos.html',
			controller: 'FotosCtrl'
		})
		.when('/videos', {
			templateUrl: '/partials/videos.html',
			controller: 'VideosCtrl'
		})
		.when('/contato', {
			templateUrl: '/partials/contato.html',
			controller: 'ContatoCtrl'
		})
		.otherwise({
			redirectTo: '/inicio'
		});
})

.run(function ($rootScope, $window, CarouselApi, TextPagesApi) {
	$rootScope.$on('$routeChangeSuccess', function (ev, data) {
		$rootScope.controller = data.controller;
	});

	$rootScope.show = {
		jumbotron: true
	};

	/* get fansite info from preloaded */
	$rootScope.fansite = window.thisFansite;

	/* load carousel */
	CarouselApi.getCarousel().then(function (data) {
		$rootScope.$broadcast('loadCarousel', data);
	});

	/* set fansite display name */
	$rootScope.displayName = ($rootScope.fansite.custom && $rootScope.fansite.custom.display_name) || $rootScope.fansite.facebook.name;
	$rootScope.aboutPage = ($rootScope.fansite.custom && $rootScope.fansite.custom.about_page);

	/* load text pages */
	TextPagesApi.getTextPages()
		.then(function (data) {
			$rootScope.textPages = data;
		});

	/* watch for page scroll to load more content */
	angular.element($window).bind('scroll', function () {
		var position = this.pageYOffset;
		var bounds = document.body.clientHeight - this.innerHeight;
		var scrolling = (bounds - position) < 500;

		if (scrolling) {
			$rootScope.$emit('shouldLoadMoreContent');
		}
	});

	/* helper to enlarge images */
	$rootScope.enlargeImage = function (image) {
		var elems = document.getElementsByClassName('enlarge-container');

		for (var i = 0; i < elems.length; i++) {
			elems[i].setAttribute('style', 'display:inline;');
		}

		var lg = document.getElementById('overlay-image');
		lg.setAttribute('style', 'display: inline; background-image: url(\'' + image + '\');');
	}

	 $rootScope.closeImage = function () {
		var elems = document.getElementsByClassName('enlarge-container');

		for (var i = 0; i < elems.length; i++) {
			elems[i].setAttribute('style', '');
		}
	 }

	/* add Facebook SDK */
	window.fbAsyncInit = function() {
		FB.init({
			appId: '675062689245409',
			xfbml: true,
			version: 'v2.3'
		});
	};

	(function(d, s, id) {
		var js;
		if (d.getElementById(id)) {
			return;
		}
		js = d.createElement(s);
		js.id = id;
		js.src = "//connect.facebook.net/pt_BR/sdk.js";
		document.body.appendChild(js);
	}(document, 'script', 'facebook-jssdk'));

	/* invoke Facebook share dialog */
	$rootScope.fbShare = function (url) {
		FB.ui({
			method: 'share',
			href: url
		}, function(response) {});
	}
});

require('./data/carousel');
require('./data/feeds');
require('./data/fotos');
require('./data/outmail');
require('./data/profile');
require('./data/textpages');
require('./data/videos');

require('./controllers/inicio');
require('./controllers/sobre');
require('./controllers/fotos');
require('./controllers/videos');
require('./controllers/contato');
require('./controllers/textpage');

require('./directives/mob-banner');
require('./directives/mob-feed');
require('./directives/mob-logo');
require('./directives/spinner-on-load');

require('./filters/date');
require('./filters/linebreaks');
require('./filters/video');