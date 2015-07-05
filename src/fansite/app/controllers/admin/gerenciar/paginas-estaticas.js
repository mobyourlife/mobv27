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
	if ($routeParams.pageid.toLowerCase() === 'nova-pagina') {
		$rootScope.$broadcast('setPageTitle', 'Criar nova página');
	} else {
		$rootScope.$broadcast('setPageTitle', 'Editar página');
	}

	window.loadEditor(function() {
		$timeout(function() {
			jQuery('#editor').wysiwyg();
		});
	});

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

		TextPagesApi.newTextPage($scope.title, body)
			.then(function () {
				$scope.cancelar();
			})
			.catch(function (err) {
				console.error(err);
				alert('Erro ao tentar salvar a página estática!\r\nPor favor tente novamente!');
			});
	}

	$scope.cancelar = function () {
		$location.path('/admin/gerenciar/paginas-estaticas');
	}
});