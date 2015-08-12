angular.module('MobYourLife')

.controller('PaginasEstaticasCtrl', function ($rootScope, $scope, $location, $timeout) {
	$rootScope.$broadcast('setPageTitle', 'Páginas estáticas');
	$rootScope.$broadcast('reloadTextPages');

	$scope.ready = false;

	window.loadEditor(function() {
		$scope.ready = true;
	});

	var waitEditor = function(callback) {
		if ($scope.ready) {
			callback();
		} else {
			$timeout(function() {
				waitEditor(callback);
			}, 50);
		}
	}

	$scope.novaPagina = function () {
		$scope.busy = true;
		waitEditor(function() {
			$location.path('/admin/gerenciar/paginas-estaticas/nova-pagina');
		});
	}
})

.controller('PaginasEstaticasEditarCtrl', function ($rootScope, $scope, $routeParams, $location, $timeout, TextPagesApi) {
	$scope.caption = 'Criar nova página';

	if ($routeParams.pageid.toLowerCase() !== 'nova-pagina') {
		$scope.caption = 'Editar página';
		$scope.editing = true;

		TextPagesApi.getPageBody($routeParams.pageid)
			.then(function (data) {
				$scope.pageid = data._id;
				$scope.title = data.title;
				$scope.group = data.group;
				document.getElementById('editor').innerHTML = data.body;
			})
			.catch(function (err) {
				console.log(err);
				$location.path('/admin/gerenciar/paginas-estaticas');
			});
	}

	$rootScope.$broadcast('setPageTitle', $scope.title);

	window.loadEditor(function() {
		$timeout(function() {
			jQuery('#editor').wysiwyg();
		});
	});

	$scope.excluir = function () {
		if (!confirm('Tem certeza que deseja excluir esta página?\r\nEsta ação é irreversível!')) {
			return;
		}

		TextPagesApi.deleteTextPage($scope.pageid)
			.then(function () {
				$location.path('/admin/gerenciar/paginas-estaticas');
			})
			.catch (function (err) {
				console.log(err);
				alert('Erro ao tentar excluir esta página!\r\nTente novamente mais tarde!');
			});
	}

	$scope.salvar = function () {
		var body;

		if (!$scope.title || $scope.title.length === 0) {
			alert('Digite o título da página!');
			return;
		}

		body = $('#editor').cleanHtml();
		if (!body || body.length === 0) {
			alert('Digite o conteúdo da página!');
			return;
		}

		TextPagesApi.saveTextPage($scope.pageid, $scope.title, body, $scope.group)
			.then(function () {
				$scope.cancelar();
			})
			.catch(function (err) {
				if (err.status === 409) {
					alert('Uma página com este nome já existe!\r\nPor favor escolha outro nome!');
				} else {
					console.error(err);
					alert('Erro ao tentar salvar a página estática!\r\nPor favor tente novamente!');
				}
			});
	}

	$scope.cancelar = function () {
		$location.path('/admin/gerenciar/paginas-estaticas');
	}
});