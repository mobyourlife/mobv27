angular.module('MobYourLife')

.controller('HomeCtrl', function ($scope, FeedsApi) {
	FeedsApi.getFeeds()
		.then(function (data) {
			$scope.feeds = data;
		})
		.catch(function (err) {
			console.error(err);
		});
});