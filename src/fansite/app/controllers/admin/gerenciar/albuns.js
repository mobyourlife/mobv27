angular.module('MobYourLife')

.controller('GerenciarAlbunsCtrl', function ($rootScope, $scope, AlbumsApi) {
	$rootScope.$broadcast('setPageTitle', 'Gerenciar Álbuns');

	var loadAlbums = function() {
		AlbumsApi.getAlbums()
			.then(function (data) {
				$scope.albums = data;
			})
			.catch(function (err) {
				console.log(err);
				loadAlbums();
			});
	}
	loadAlbums();

	$scope.getIcon = function (type) {
		switch (type) {
			case 'banner':
				return 'mi-th-large';

			case 'page':
				return 'mi-file-image';

			case 'hide':
				return 'mi-trash';

			default:
				return 'mi-doc';
		}
	}

	$scope.getLabel = function (type) {
		switch (type) {
			case 'banner':
				return 'Banner rotativo';

			case 'page':
				return 'Página exclusiva';

			case 'hide':
				return 'Descartar';

			default:
				return 'Padrão';
		}
	}
});