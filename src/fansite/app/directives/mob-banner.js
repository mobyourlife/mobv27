angular.module('MobYourLife')

.directive('mobBanner', function ($rootScope, $timeout) {
	return {
		scope: {
			'fansiteName': '=',
			'pageTitle': '=',
			'cover': '='
		},
		link: function (scope, element, attr) {
			scope.title = scope.fansiteName;
			scope.showBanner = scope.title && scope.title.length !== 0;
			scope.margin = 0;
			scope.height = (scope.cover && scope.cover.height) || 250;

			/* in case banner is not shown, logo should be kept small to fit the navbar */
			if (!scope.showBanner) {
				$rootScope.$broadcast('disableBigLogo');
			}

			/* listen to logo resize events to add left padding to banner's title */
			$rootScope.$on('resizeLogo', function (ev, data) {
				scope.margin = (!data || data.scrolling) ? 0 : data.width;
			});

			/* listen to page title events to update banner's title */
			$rootScope.$on('setPageTitle', function (ev, title) {
				scope.title = title || scope.fansiteName;

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			});
		},
		templateUrl: '/templates/mob-banner.html'
	}
});