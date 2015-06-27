angular.module('MobYourLife.Data', [])

.service('BaseApi', function ($rootScope, $http) {
	var baseApi = 'http://localhost:2710/api/';

	this.getApi = function (method) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		return $http.get(uri);
	}
});