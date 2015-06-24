angular.module('MobYourLife')

.controller('FotosCtrl', function ($scope, FotosApi) {
	FotosApi.getFotos()
		.then(function (data) {
			$scope.fotos = data;
		})
		.catch(function (err) {
			console.error(err);
		});
});