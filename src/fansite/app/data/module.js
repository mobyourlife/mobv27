angular.module('MobYourLife.Data', [])

.service('BaseApi', function ($rootScope, $http) {
	var baseApi = 'http://{#config.api.host#}:{#config.api.port#}/api/';

	this.getApi = function (method, args) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		var params = args ? { params: args } : {};
		return $http.get(uri, params);
	}

	this.postApi = function (method, args) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		var params = args ? { params: args } : {};
		return $http.post(uri, params);
	}

	this.deleteApi = function (method, args) {
		var uri = baseApi + $rootScope.fansite._id + '/' + method;
		var params = args ? { params: args } : {};
		return $http.delete(uri, params);
	}

	var v3Api = 'http{#config.v3.ssl#}://{#config.v3.host#}:{#config.v3.port#}/api/';

	this.getCredentialsV3 = function (method, args) {
		var uri = v3Api + method;
		var params = args ? { params: args } : {};
		return $http({
			method: 'GET',
			withCredentials: true,
			url: uri
		});
	}
});