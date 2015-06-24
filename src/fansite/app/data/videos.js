angular.module('MobYourLife.Data')

.service('VideosApi', function (BaseApi) {
	this.getVideos = function () {
		var promise = BaseApi.getCached('videos')
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});