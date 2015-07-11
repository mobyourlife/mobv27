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
			if (model && model.object_id) {
				_embed = 'https://www.facebook.com/video/embed?video_id=' + model.object_id;
			} else {
				var match = /videos\/([0-9]+)/.exec(validate);

				if (match) {
					_mebed = 'https://www.facebook.com/video/embed?video_id=' + match[1];
				}
			}
		}

		return $sce.trustAsResourceUrl(_embed);
	};
});