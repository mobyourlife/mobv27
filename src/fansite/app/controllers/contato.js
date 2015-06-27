angular.module('MobYourLife')

.controller('ContatoCtrl', function ($rootScope) {
	$rootScope.$broadcast('setPageTitle', 'Contato');
});