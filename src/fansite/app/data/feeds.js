angular.module('MobYourLife.Data')

.service('FeedsApi', function (BaseApi) {
	this.getFeeds = function () {
		var promise = BaseApi.getCached('feeds')
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});