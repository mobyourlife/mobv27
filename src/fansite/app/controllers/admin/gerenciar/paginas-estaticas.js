angular.module('MobYourLife')

.controller('PaginasEstaticasCtrl', function ($rootScope, $scope) {
	$rootScope.$broadcast('setPageTitle', 'Páginas estáticas');
})

.controller('PaginasEstaticasEditarCtrl', function ($rootScope, $scope, $routeParams, $location) {
	if ($routeParams.pageid.toLowerCase() === 'nova-pagina') {
		$rootScope.$broadcast('setPageTitle', 'Criar nova página');
	} else {
		$rootScope.$broadcast('setPageTitle', 'Editar página');
	}

	$scope.cancelar = function () {
		$location.path('/admin/gerenciar/paginas-estaticas');
	}
});