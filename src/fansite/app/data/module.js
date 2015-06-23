angular.module('MobYourLife.Data', [])

.service('BaseApi', function ($rootScope, $http) {
	var baseCache = 'http://localhost:2700/cache/';

	this.getCached = function (method) {
		var uri = baseCache + 'content/' + $rootScope.fansite.id + '/' + method + '.json';
		return $http.get(uri);
	}
});