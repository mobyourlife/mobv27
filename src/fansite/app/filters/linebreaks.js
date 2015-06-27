angular.module('MobYourLife')

.filter('lineBreaks', function ($sce) {
	return function(input) {
		var ret = input.replace(/\n/g, '<br/>');
		return $sce.trustAsHtml(ret);
	}
});