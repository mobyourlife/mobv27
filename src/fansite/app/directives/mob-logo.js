angular.module('MobYourLife')

.directive('mobLogo', function ($rootScope, $timeout, $window) {
	return {
		scope: {
			picture: '=',
			custom: '=',
			alt: '='
		},
		link: function (scope, element, attr) {
			scope.bigLogo = false;

			if (!scope.margin) {
				scope.margin = 0;
			}

			/* choose wether big logo will be displayed based on settings and scrolling offset */
			var setLogoSize = function (scrolling) {
				scope.bigLogo = (scope.custom.path && scope.custom.width && !scrolling);
			}

			/* bind window's scroll event */
			angular.element($window).bind('scroll', function () {
				var scrolling = (this.pageYOffset >= 100);
				$rootScope.$emit('resizeLogo', scrolling);
			});

			/* listen to logo resizeevents */
			$rootScope.$on('resizeLogo', function (ev, scrolling) {
				setLogoSize(scrolling);

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			})

			/* defer first resize and issue an event to broadcast it to other dependent modules */
			$timeout(function() {
				$rootScope.$broadcast('resizeLogo');
			});
		},
		templateUrl: '/templates/mob-logo.html'
	}
});