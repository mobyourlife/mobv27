angular.module('MobYourLife')

.controller('ContatoCtrl', function($rootScope, $scope, $location, OutmailApi) {
	$rootScope.$broadcast('setPageTitle', 'Contato');
	$scope.busy = false;

	var isEmail = function (email) {
		var regex = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i;
		return regex.exec(email);
	}

	$scope.sendMail = function() {
		if (!$scope.name || $scope.name.length === 0) {
			alert('Digite seu nome!');
		} else if (!$scope.email || $scope.email.length === 0) {
			alert('Digite seu endereço de email!');
		} else if (!isEmail($scope.email)) {
			alert('Digite um endereço de email válido!');
		} else if (!$scope.message || $scope.message.length === 0) {
			alert('Digite sua mensagem!');
		} else {
			$scope.busy = true;

			OutmailApi.postNewMail({
					name: $scope.name,
					email: $scope.email,
					message: $scope.message
				})
				.then(function() {
					$location.path('/contato/obrigado');
				})
				.catch(function(err) {
					console.log(err);
				})
				.finally(function() {
					$scope.busy = false;
				});
		}
	}
})

.controller('ContatoObrigadoCtrl', function ($rootScope) {
	$rootScope.$broadcast('setPageTitle', 'Contato');
});