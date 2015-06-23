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

.run(function ($rootScope, ProfileApi) {
	$rootScope.$on('$routeChangeSuccess', function (ev, data) {
		$rootScope.controller = data.controller;
	});

	$rootScope.show = {
		jumbotron: true
	};

	$rootScope.fansite = {
		name: null
	};

	ProfileApi.getProfile()
		.then(function (data) {
			$rootScope.fansite = data;
		})
		.catch(function (err) {
			console.error(err);
		});
});

require('./data/profile');

require('./controllers/home');
require('./controllers/sobre');
require('./controllers/fotos');
require('./controllers/videos');
require('./controllers/contato');