angular.module('MobYourLife')

.filter('video', function ($filter, $sce) {
	return function(input) {
		if (input == null) {
			return '';
		}

		var validate = input.toLowerCase();
		var _embed = input;

		if (validate.indexOf('youtube.com') != -1) {
			var match = /[^?]+(?:\?v=([^&]+).*)?/.exec(input);
			if (match) {
				_embed = 'https://youtube.com/embed/' + match[1];
			}
		}

		return $sce.trustAsResourceUrl(_embed);
	};
});