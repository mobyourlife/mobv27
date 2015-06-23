angular.module('MobYourLife.Data')

.service('ProfileApi', function (BaseApi) {
	this.getProfile = function () {
		var promise = BaseApi.getCached('profile')
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});