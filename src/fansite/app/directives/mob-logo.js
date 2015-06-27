angular.module('MobYourLife')

.directive('mobLogo', function ($rootScope, $timeout, $window) {
	return {
		scope: {
			picture: '=',
			custom: '=',
			alt: '='
		},
		link: function (scope, element, attr) {
			scope.allowed = true;
			scope.bigLogo = false;

			if (!scope.margin) {
				scope.margin = 0;
			}

			/* choose wether big logo will be displayed based on settings and scrolling offset */
			var setLogoSize = function (scrolling) {
				scope.bigLogo = (scope.allowed && scope.custom && scope.custom.path && scope.custom.width && !scrolling);
			}

			/* bind window's scroll event */
			angular.element($window).bind('scroll', function () {
				var scrolling = (this.pageYOffset >= 100);
				$rootScope.$broadcast('resizeLogo', {
					scrolling: scrolling,
					width: scope.custom ? scope.custom.width : 0
				});
			});

			/* listen to logo resize events */
			$rootScope.$on('resizeLogo', function (ev, data) {
				setLogoSize(data.scrolling);

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			});

			/* may disable big logo when there's no jumbotron */
			$rootScope.$on('disableBigLogo', function () {
				scope.allowed = false;
				$rootScope.$broadcast('resizeLogo', {
					width: scope.custom ? scope.custom.width : 0
				});
			});

			/* defer first resize and issue an event to broadcast it to other dependent modules */
			$timeout(function() {
				$rootScope.$broadcast('resizeLogo', {
					width: scope.custom ? scope.custom.width : 0
				});
			});
		},
		templateUrl: '/templates/mob-logo.html'
	}
});