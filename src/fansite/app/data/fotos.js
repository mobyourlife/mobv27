angular.module('MobYourLife.Data')

.service('FotosApi', function (BaseApi) {
	this.getFotos = function (args) {
		var promise = BaseApi.getApi('fotos', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});