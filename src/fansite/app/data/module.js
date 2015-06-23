angular.module('MobYourLife.Data', [])

.service('BaseApi', function ($http) {
	var baseCache = 'http://localhost:2700/cache/';

	this.getCached = function (method) {
		return $http.get(baseCache + method + '.json');
	}
});