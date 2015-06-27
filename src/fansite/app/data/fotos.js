angular.module('MobYourLife.Data')

.service('FotosApi', function (BaseApi) {
	this.getFotos = function () {
		var promise = BaseApi.getApi('fotos')
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});