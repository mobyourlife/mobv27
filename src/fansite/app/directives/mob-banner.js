angular.module('MobYourLife')

.directive('mobBanner', function ($rootScope) {
	return {
		scope: {
			'fansiteName': '=',
			'pageTitle': '='
		},
		link: function (scope, element, attr) {
			scope.title = scope.pageTitle || scope.fansiteName;
			scope.showBanner = scope.title && scope.title.length !== 0;
			scope.margin = 0;

			/* in case banner is not shown, logo should be kept small to fit the navbar */
			if (!scope.showBanner) {
				$rootScope.$broadcast('disableBigLogo');
			}

			/* listen to logo resize events to add left padding to banner's title */
			$rootScope.$on('resizeLogo', function (ev, data) {
				scope.margin = (!data || data.scrolling) ? 0 : data.width;
			});
		},
		templateUrl: '/templates/mob-banner.html'
	}
});