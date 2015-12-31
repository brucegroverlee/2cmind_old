(function () {
	angular.module('ccmind.controllers', [])
		.controller('', ['', function () {
			
		}])

		.controller('navBarController', ['$scope', '$window', function ($scope, $window) {
			$scope.scrollTop = 0;
			$scope.topAbout = 0;
			$scope.topDevices = 0;
			$scope.topCollaborate = 0;
			$scope.topLogin = 0;
			/*$window.onscroll = function () {
				$scope.scrollTop = $window.pageYOffset;
			};*/
			angular.element($window).bind("scroll", function() {
	            $scope.scrollTop = $window.pageYOffset;
	            $scope.$apply();
	        });

			$(window).resize(getSlidePosition);

			$(window).ready(getSlidePosition);

			function getSlidePosition () {
				var time = 400;
				$scope.topAbout = $('#slide-about').position().top - 50;
				$scope.topDevices = $('#slide-devices').position().top - 50;
				$scope.topCollaborate = $('#slide-collaborate').position().top - 50;
				$scope.topLogin = $('#slide-login').position().top - 50;
	            //$scope.scrollTop = $scope.topAbout;
	            $scope.$apply();

	            $('#nav-home').click(function () {
					$('body,html').animate({
						scrollTop: 0
					}, time);
					return false;
				});

				$('#nav-about').click(function () {
					$('body,html').animate({
						scrollTop: $scope.topAbout
					}, time);
					return false;
				});

				$('#nav-devices').click(function () {
					$('body,html').animate({
						scrollTop: $scope.topDevices
					}, time);
					return false;
				});

				$('#nav-collaborate').click(function () {
					$('body,html').animate({
						scrollTop: $scope.topCollaborate
					}, time);
					return false;
				});

				$('#nav-join').click(function () {
					$('body,html').animate({
						scrollTop: $scope.topLogin
					}, time);
					return false;
				});

				$('#nav-login').click(function () {
					$('body,html').animate({
						scrollTop: $scope.topLogin
					}, time);
					return false;
				});
			}

				

	        //angular.element($window).bind('onresize' function () {
	            //$scope.scrollTop = 'se esta escalando 2';
	            //$scope.$apply();
	        	//alert('se esta escalando 2');
	        //});
			
		}])

		.controller('joinController', ['$scope', function ($scope) {
			//$scope.attribute;
			$scope.name = null;
			$scope.email = null;
			$scope.password = null;
			$scope.repassword = null;
			$scope.equalpassword = null;

			$scope.equalPassword = function (){
				if ($scope.password !== $scope.repassword) {
					$scope.equalpassword = 'has-error';
				} else {
					$scope.equalpassword = 'has-success';
				}
			};
		}])
		
		.controller('loginController', ['$scope', function ($scope) {
			//$scope.attribute;
			/*$scope.name = null;
			$scope.email = null;
			$scope.password = null;
			$scope.repassword = null;
			$scope.equalpassword = null;

			$scope.equalPassword = function (){
				if ($scope.password !== $scope.repassword) {
					$scope.equalpassword = 'has-error';
				} else {
					$scope.equalpassword = 'has-success';
				}
			};*/
		}]);
})();