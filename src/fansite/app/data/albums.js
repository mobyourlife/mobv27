angular.module('MobYourLife.Data')

.service('AlbumsApi', function (BaseApi) {
	this.getAlbums = function (args) {
		var promise = BaseApi.getApi('albums', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});