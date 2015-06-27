angular.module('MobYourLife')

.filter('video', function ($filter, $sce) {
	return function(model) {
		if (!model) {
			return '';
		}

		var input = model.link;
		var validate = input.toLowerCase();
		var _embed = input;

		if (validate.indexOf('youtube.com') != -1) {
			var match = /[^?]+(?:\?v=([^&]+).*)?/.exec(input);
			if (match) {
				_embed = 'https://youtube.com/embed/' + match[1];
			}
		} else if (validate.indexOf('facebook.com') != -1) {
			if (model.object_id) {
				_embed = 'https://www.facebook.com/video/embed?video_id=' + model.object_id;
			}
		}

		return $sce.trustAsResourceUrl(_embed);
	};
});