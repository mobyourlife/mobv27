angular.module('MobYourLife')

.controller('VideosCtrl', function ($scope, VideosApi) {
	VideosApi.getVideos()
		.then(function (data) {
			$scope.videos = data;
		})
		.catch(function (err) {
			console.error(err);
		});
});