angular.module('MobYourLife.Data')

.service('FeedsApi', function (BaseApi) {
	this.getFeeds = function (args) {
		var promise = BaseApi.getApi('feeds', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});