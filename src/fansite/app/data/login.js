angular.module('MobYourLife.Data')

.service('LoginApi', function (BaseApi) {
	this.getLoginInfo = function (args) {
		var promise = BaseApi.getCredentialsV3('login', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});