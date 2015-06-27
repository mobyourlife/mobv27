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

.run(function ($rootScope) {
	$rootScope.$on('$routeChangeSuccess', function (ev, data) {
		$rootScope.controller = data.controller;
	});

	$rootScope.show = {
		jumbotron: true
	};

	/* get fansite info from preloaded */
	$rootScope.fansite = window.thisFansite;

	/* set fansite display name */
	$rootScope.displayName = ($rootScope.fansite.custom && $rootScope.fansite.custom.display_name) || $rootScope.fansite.facebook.name;
	$rootScope.aboutPage = ($rootScope.fansite.custom && $rootScope.fansite.custom.about_page);
});

require('./data/feeds');
require('./data/fotos');
require('./data/profile');
require('./data/videos');

require('./controllers/inicio');
require('./controllers/sobre');
require('./controllers/fotos');
require('./controllers/videos');
require('./controllers/contato');

require('./directives/mob-banner');
require('./directives/mob-feed');
require('./directives/mob-logo');
require('./directives/spinner-on-load');

require('./filters/date');
require('./filters/video');