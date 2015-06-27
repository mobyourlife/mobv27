angular.module('MobYourLife')

.controller('VideosCtrl', function ($rootScope, $scope, VideosApi) {
	var busy = false;
	$scope.videos = [];

	$rootScope.$broadcast('setPageTitle', 'Vídeos');

	var getMoreVideos = function () {
		if (busy) {
			return;
		}

		var args = [];
		busy = true;

		if ($scope.videos.length > 0) {
			var last = $scope.videos.length - 1;
			var item = $scope.videos[last];
			args['direction'] = 'before';
			args['ne'] = item._id;
			args['time'] = item.time;
		}

		VideosApi.getVideos(args)
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					$scope.videos.push(data[i]);
				}
			})
			.catch(function (err) {
				console.error(err);
			})
			.finally(function () {
				busy = false;
			});
	}

	/* lore more content as the user scrolls */
	$rootScope.$on('shouldLoadMoreContent', function() {
		getMoreVideos();
	});

	/* load first contents */
	getMoreVideos();
});