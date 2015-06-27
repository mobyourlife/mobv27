angular.module('MobYourLife.Data')

.service('CarouselApi', function (BaseApi) {
	this.getCarousel = function (args) {
		var promise = BaseApi.getApi('carousel')
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});