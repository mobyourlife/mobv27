angular.module('MobYourLife')

.controller('SobreCtrl', function ($rootScope, $scope) {
	$scope.hotinfo = [];
	
	$rootScope.$broadcast('setPageTitle', ($rootScope.aboutPage || 'Sobre'));

	/* fanpage likes */
	$scope.hotinfo.push({
		icon: 'thumbs-up',
		label: 'Curtidas',
		value: $rootScope.fansite.facebook.stats.likes
	});

	/* fanpage ratings */
	if ($rootScope.fansite.ratings && $rootScope.fansite.ratings_average) {
		$scope.hotinfo.push({
			icon: 'star-empty',
			label: 'Avaliação geral',
			value: $rootScope.fansite.ratings_average.toFixed(1).replace('.', ',')
		});
	}

	/* company foundation */
	if ($rootScope.fansite.facebook.info.company && $rootScope.fansite.facebook.info.company.founded) {
		$scope.hotinfo.push({
			icon: 'building',
			label: 'Fundação',
			value: $rootScope.fansite.facebook.info.company.founded
		});
	}

	/* band record label */
	if ($rootScope.fansite.facebook.info.band && $rootScope.fansite.facebook.info.band.record_label) {
		$scope.hotinfo.push({
			icon: 'headphones',
			label: 'Gravadora',
			value: $rootScope.fansite.facebook.info.band.record_label
		});
	}

	/* band booking agent */
	if ($rootScope.fansite.facebook.info.band && $rootScope.fansite.facebook.info.band.booking_agent) {
		$scope.hotinfo.push({
			icon: 'user-secret',
			label: 'Gravadora',
			value: $rootScope.fansite.facebook.info.band.booking_agent
		});
	}

	/* film director */
	if ($rootScope.fansite.facebook.info.film && $rootScope.fansite.facebook.info.film.directed_by) {
		$scope.hotinfo.push({
			icon: 'user-secret',
			label: 'Diretor',
			value: $rootScope.fansite.facebook.info.film.directed_by
		});
	}

	/* location */
	if ($rootScope.fansite.facebook.place && $rootScope.fansite.facebook.place.location && $rootScope.fansite.facebook.place.location.city) {
		$scope.hotinfo.push({
			icon: 'globe',
			label: 'Localização',
			value: $rootScope.fansite.facebook.place.location.city
		});
	}
});