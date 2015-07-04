var angular = require('angular');
var ngRoute = require('angular-route');

require('./data/module');

angular.module('MobYourLife', [
	'MobYourLife.Data',
	'ngRoute'
])

.config(function ($routeProvider) {

	var isLoggedIn = function ($rootScope, $location, LoginApi) {
		var user = $rootScope.user;
		if (user && user.auth) {
			return true;
		} else {
			LoginApi.getLoginInfo()
				.then(function (data) {
					if (data && data.auth) {
						return true;
					} else {
						$location.path('/');
						return false;
					}
				})
				.catch(function (err) {
					$location.path('/');
					return false;
				});
		}
	}

	var requiresLogin = {
		isLoggedIn: ['$rootScope', '$location', 'LoginApi', isLoggedIn]
	};

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
		.when('/a/:page', {
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
		.when('/admin/gerenciar/albuns', {
			templateUrl: '/partials/admin/gerenciar/albuns.html',
			controller: 'GerenciarAlbunsCtrl',
			resolve: requiresLogin
		})
		.when('/admin/gerenciar/albuns/:albumid', {
			templateUrl: '/partials/admin/gerenciar/albuns/editar.html',
			controller: 'GerenciarAlbunsEditarCtrl',
			resolve: requiresLogin
		})
		.otherwise({
			redirectTo: '/inicio'
		});
})

.run(function ($rootScope, $timeout, $window, CarouselApi, TextPagesApi, AlbumPagesApi, LoginApi) {
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

	/* get login info */
	var checkingLogin = false;
	var loadLoginInfo = function (callback) {
		checkingLogin = true;
		LoginApi.getLoginInfo()
			.then(function (data) {
				$rootScope.user = data;
			})
			.catch(function (err) {
				console.error(err);
				/* user is not logged in */
				if (err.headers && err.headers.status === 401) {
					return;
				}

				/* connection timeout, try again */
				$timeout(function() {
					//loadLoginInfo();	
				}, 1000);
			})
			.finally(function () {
				checkingLogin = false;

				if (callback) {
					callback();
				}
			});
	}
	loadLoginInfo();

	/* load text pages */
	var loadTextPages = function () {
		TextPagesApi.getTextPages()
			.then(function (data) {
				$rootScope.textPages = data;
			})
			.catch(function (err) {
				console.error(err);
				$timeout(function() {
					loadTextPages();	
				}, 1000);
			});
	}
	loadTextPages();

	/* load album pages */
	var loadAlbumPages = function () {
		AlbumPagesApi.getAlbumPages()
			.then(function (data) {
				$rootScope.albumPages = data;
			})
			.catch(function (err) {
				console.error(err);
				$timeout(function() {
					loadAlbumPages();	
				}, 1000);
			});
	}
	loadAlbumPages();

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

require('./data/albumpages');
require('./data/albums');
require('./data/carousel');
require('./data/feeds');
require('./data/fotos');
require('./data/login');
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
require('./controllers/admin/gerenciar/albuns');

require('./directives/mob-banner');
require('./directives/mob-feed');
require('./directives/mob-logo');
require('./directives/spinner-on-load');

require('./filters/date');
require('./filters/linebreaks');
require('./filters/video');