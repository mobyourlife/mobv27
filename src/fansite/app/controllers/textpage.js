angular.module('MobYourLife')

.controller('TextPageCtrl', function ($rootScope, $scope, $routeParams, $sce, $timeout, TextPagesApi) {
	var getPageBody = function() {
		TextPagesApi.getPageBody($routeParams.page)
			.then(function (data) {
				$rootScope.$broadcast('setPageTitle', data.title);
				$rootScope.activeTextPage = data.path;
				$scope.pageBody = $sce.trustAsHtml(data.body);
			})
			.catch(function (err) {
				console.log(err);
				$timeout(function() {
					getPageBody();
				});
			});
	}

	getPageBody();
});