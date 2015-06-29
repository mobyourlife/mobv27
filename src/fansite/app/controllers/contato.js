angular.module('MobYourLife')

.controller('ContatoCtrl', function($rootScope, $scope, OutmailApi) {
	$rootScope.$broadcast('setPageTitle', 'Contato');
	$scope.busy = false;

	$scope.sendMail = function() {
		$scope.busy = true;

		OutmailApi.postNewMail({
				name: $scope.name,
				email: $scope.email,
				message: $scope.message
			})
			.then(function() {
				//
			})
			.catch(function(err) {
				//
			})
			.finally(function() {
				$scope.busy = false;
			});
	}
});