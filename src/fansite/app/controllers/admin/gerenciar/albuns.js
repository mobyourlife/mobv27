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
				return 'mi-trash-empty';

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
				return 'Descartar álbum';

			default:
				return 'Padrão';
		}
	}
})

.controller('GerenciarAlbunsEditarCtrl', function ($rootScope, $scope, $routeParams, $location, $timeout, AlbumsApi) {
	$rootScope.$broadcast('setPageTitle', 'Gerenciar Álbuns');

	AlbumsApi.getAlbum($routeParams.albumid)
		.then(function (data) {
			$scope.album = data;
		})
		.catch(function (err) {
			console.log(err);
			$location.path('/admin/gerenciar/albuns');
		});

	$scope.setSpecial = function (type) {
		$scope.album.special = type;

		AlbumsApi.setAlbumType($scope.album._id, $scope.album.special)
			.then(function (data) {
				if ($scope.album.special === 'banner') {
					$timeout(function() {
						$rootScope.$broadcast('refreshCarousel');
					});
				}

				$scope.cancelar();
			})
			.catch(function (err) {
				alert('Falha ao tentar salvar o álbum!\nPor favor tente novamente.');
			});
	}

	$scope.cancelar = function () {
		$location.path('/admin/gerenciar/albuns');
	}
});