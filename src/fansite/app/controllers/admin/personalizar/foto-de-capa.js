var Hammer = require('hammerjs');

angular.module('MobYourLife')

.controller('FotoDeCapaCtrl', function ($rootScope, $scope, $location, $timeout) {
	$rootScope.$broadcast('setPageTitle', 'Foto de capa');

	$scope.step = 1;
	$scope.ready = false;

	window.loadFileUpload(function() {
		$scope.ready = true;
	});

	var waitFileUpload = function(callback) {
		if ($scope.ready) {
			callback();
		} else {
			$timeout(function() {
				waitFileUpload(callback);
			}, 50);
		}
	}

	$scope.disableCarousel = function () {
		$rootScope.$broadcast('loadCarousel', null);
	}

	var $resizing = false;
	var $origin_y, $origin_h;

	/* make jumbotron draggable */
	var makeDraggable = function () {
		/* handle resize */
		var handleResizeStart = function(clientY) {
			$resizing = true;
			$origin_y = clientY;
			$origin_h = $('.jumbotron').height();
		}

		var handleResizeMove = function(clientY) {
			if ($resizing === true) {
				dif = clientY - $origin_y;
				$('.jumbotron').height($origin_h + dif);
			}
		}

		var handleResizeFinish = function() {
			$resizing = false;
		}

		/* set events */
		$('.jumbotron').mousedown(function(event) {
			handleResizeStart(event.clientY);
		});

		$('body').mousemove(function(event) {
			handleResizeMove(event.clientY);
		});

		$('body').mouseup(function(event) {
			handleResizeFinish();
		});
	}

	/* handle image choice */
	$scope.uploadImage = function (files) {
		if (files.length !== 1) {
			$scope.step = 1;
		}

		$scope.url = URL.createObjectURL(files[0]);
		$scope.elem = document.getElementsByClassName('jumbotron')[0];
		$scope.elem.style.cssText = "background-image: url('" + $scope.url + "'); height: 250px;";
		$scope.elem.className += ' adjustable';
		$scope.step = 2;
		
		makeDraggable();

		$timeout(function() {
			$scope.$apply();
		});
	}

	/* upload image to server */
	$scope.salvar = function () {
		//
	}

	/* cancel operation */
	 $scope.cancelar = function () {
	 	$location.path('/');
	 }
});