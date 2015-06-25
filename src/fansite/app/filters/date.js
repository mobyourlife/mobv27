angular.module('MobYourLife')

.filter('displayDate', function ($filter) {
	return function(input) {
		if (input == null) {
			return '';
		}

		var _date = $filter('date')(new Date(input), 'dd/MM/yyyy');

		return _date.toUpperCase();
	};
})

.filter('displayDateTime', function ($filter) {
	return function(input) {
		if (input == null) {
			return '';
		}

		var _date = $filter('date')(new Date(input), 'dd/MM/yyyy HH:mm:ss');

		return _date.toUpperCase();
	};
})

.filter('displayTime', function ($filter) {
	return function(input) {
		if (input == null) {
			return '';
		}

		var _date = $filter('date')(new Date(input), 'HH:mm:ss');

		return _date.toUpperCase();
	};
});