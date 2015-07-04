angular.module('MobYourLife.Data')

.service('AlbumsApi', function (BaseApi) {
	this.getAlbums = function (args) {
		var promise = BaseApi.getApi('albums', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}

	this.getAlbum = function (albumid, args) {
		var uri = 'albums/' + albumid;
		var promise = BaseApi.getApi(uri, args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}

	this.setAlbumType = function (album_id, type) {
		var uri = 'albums/' + album_id;
		var args = { type: type };
		var promise = BaseApi.postApi(uri, args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});