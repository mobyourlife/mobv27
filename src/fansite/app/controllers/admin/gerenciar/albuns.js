angular.module('MobYourLife')

.controller('GerenciarAlbunsCtrl', function ($rootScope) {
	$rootScope.$broadcast('setPageTitle', 'Gerenciar Álbuns');
});