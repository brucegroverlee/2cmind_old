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
			
		}])

		.controller('joinController', ['$scope', 'ccmindJoinService', function ($scope, ccmindJoinService) {
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
			
			$scope.join = function () {
				if ($scope.equalpassword === 'has-success') {
					var promise = ccmindJoinService.join($scope.name, $scope.email, $scope.password);
					promise.then(
						function (response) {
							alert( response.error );
						},
						function (response) {
							alert( response.error );
						}
					);
				}
			}

		}])
		
		.controller('loginController', ['$scope', 'ccmindLoginService', function ($scope, ccmindLoginService) {
			$scope.email = null;
			$scope.password = null;

			$scope.login = function () {
				var promise = ccmindLoginService.login($scope.email, $scope.password);
				promise.then(
					function (response) {
						alert( response.error );
					},
					function (response) {
						alert( response.error );
					}
				);
			}

		}]);
})();