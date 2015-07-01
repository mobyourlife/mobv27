angular.module('MobYourLife.Data')

.service('AlbumPagesApi', function (BaseApi) {
	this.getAlbumPages = function (args) {
		var promise = BaseApi.getApi('albumpages', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});