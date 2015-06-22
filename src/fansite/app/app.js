var angular = require('angular');
var ngRoute = require('angular-route');

angular.module('MobYourLife', [
	'ngRoute'
])

.config(function ($routeProvider) {
	$routeProvider
		.when('/inicio', {
			templateUrl: '/templates/inicio.html',
			controller: 'HomeCtrl'
		})
		.otherwise({
			redirectTo: '/inicio'
		});
})

require('./controllers/home');