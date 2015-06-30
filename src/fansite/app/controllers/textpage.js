angular.module('MobYourLife')

.controller('TextPageCtrl', function ($rootScope, $scope, $routeParams, $sce, TextPagesApi) {
	TextPagesApi.getPageBody($routeParams.page)
		.then(function (data) {
			$rootScope.$broadcast('setPageTitle', data.title);
			$rootScope.activeTextPage = data.path;
			$scope.pageBody = $sce.trustAsHtml(data.body);
		});
});