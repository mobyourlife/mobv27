var angular = require('angular');
var ngRoute = require('angular-route');

angular.module('MobYourLife', [
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
});

require('./controllers/home');
require('./controllers/sobre');
require('./controllers/fotos');
require('./controllers/videos');
require('./controllers/contato');