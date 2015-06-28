angular.module('MobYourLife')

.filter('lineBreaks', function ($sce) {
	return function(input) {
		if (!input) {
			return null;
		}
		
		var ret = input.replace(/\n/g, '<br/>');
		return $sce.trustAsHtml(ret);
	}
});