angular.module('MobYourLife.Data')

.service('VideosApi', function (BaseApi) {
	this.getVideos = function (args) {
		var promise = BaseApi.getApi('videos', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});