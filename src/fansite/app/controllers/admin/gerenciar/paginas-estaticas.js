angular.module('MobYourLife')

.controller('PaginasEstaticasCtrl', function ($rootScope, $scope, $location, $timeout) {
	$rootScope.$broadcast('setPageTitle', 'Páginas estáticas');

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

.controller('PaginasEstaticasEditarCtrl', function ($rootScope, $scope, $routeParams, $location, $timeout) {
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

	$scope.cancelar = function () {
		$location.path('/admin/gerenciar/paginas-estaticas');
	}
});