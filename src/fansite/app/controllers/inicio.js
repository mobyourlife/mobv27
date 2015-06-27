angular.module('MobYourLife')

.controller('HomeCtrl', function($rootScope, $scope, FeedsApi) {
	var busy = false;
	$scope.feeds = [];

	var getMoreFeeds = function () {
		if (busy) {
			return;
		}

		var args = [];
		busy = true;

		if ($scope.feeds.length > 0) {
			var last = $scope.feeds.length - 1;
			var item = $scope.feeds[last];
			args['direction'] = 'before';
			args['ne'] = item._id;
			args['time'] = item.time;
		}

		FeedsApi.getFeeds(args)
			.then(function (data) {
				for (var i = 0; i < data.length; i++) {
					$scope.feeds.push(data[i]);
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
		getMoreFeeds();
	});

	/* load first contents */
	getMoreFeeds();
});