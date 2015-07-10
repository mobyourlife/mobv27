angular.module('MobYourLife')

.directive('mobBanner', function ($rootScope, $window, $timeout) {
	return {
		scope: {
			'fansiteName': '=',
			'pageTitle': '=',
			'cover': '=',
			'logo': '=',
		},
		link: function (scope, element, attr) {
			scope.title = scope.fansiteName;
			scope.showBanner = scope.title && scope.title.length !== 0;
			scope.margin = (scope.logo && scope.logo.width) || 0;
			scope.height = 250;

			/* show cover background */
			if (scope.cover && scope.cover.path && scope.cover.height) {
				var path = scope.cover.path;

				if (path.indexOf('http') == -1) {
					path = '/uploads/' + path;
				}

				var img = new Image();
				img.onload = function() {
					/* defer scope apply to the next digest cycle to avoid a digest in progress */
					$timeout(function() {
						scope.background = 'background-image: url(' + path + ');';
						scope.height = (scope.cover && scope.cover.height) || 250;
						scope.$apply();
					});
				}
				img.src = path;
			}

			/* in case banner is not shown, logo should be kept small to fit the navbar */
			if (!scope.showBanner) {
				$rootScope.$broadcast('disableBigLogo');
			}

			/* bind window's scroll event */
			angular.element($window).bind('scroll', function () {
				var scrolling = (this.pageYOffset >= 100);
				scope.margin = (!scrolling && scope.logo && scope.logo.width) || 0;

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			});

			/* listen to logo resize events to add left padding to banner's title */
			$rootScope.$on('resizeJumbo', function (ev, data) {
				console.log('resizing jumbo to width = ' + data.width + 'px');
				scope.margin = (!data || data.scrolling) ? 0 : data.width;

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			});

			/* listen to page title events to update banner's title */
			$rootScope.$on('setPageTitle', function (ev, title) {
				scope.title = title || scope.fansiteName;

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});
			});

			/* listen to carousel events */
			$rootScope.$on('loadCarousel', function (ev, carousel) {
				$rootScope.carouselEnabled = !!(carousel);
				scope.background = null;
				scope.carousel = carousel;
				scope.activeIndex = -1;
				scope.height = (carousel ? 350 : 250);
				scope.chevron = (scope.height * 0.85);

				/* defer scope apply to the next digest cycle to avoid a digest in progress */
				$timeout(function() {
					scope.$apply();
				});

				/* controls carousel state */
				scope.carouselNavigate = function (to) {
					if (to >= scope.carousel.length) {
						to = 0;
					}

					if (to < 0) {
						to = scope.carousel.length - 1;
					}

					scope.activeIndex = to;
				}

				scope.carouselNext = function () {
					scope.carouselNavigate(scope.activeIndex + 1);
				}

				scope.carouselPrevious = function () {
					scope.carouselNavigate(scope.activeIndex - 1);
				}

				var carouselTimeout = function() {
					scope.carouselNext();
					$timeout(function() { scope.$apply(); });
					$timeout(carouselTimeout, (10 * 1000));
				}

				carouselTimeout();
			});
		},
		templateUrl: '/templates/mob-banner.html'
	}
});