(function () {
	angular.module('ccmind.controllers', [])
		.controller('', ['', function () {
			
		}])
		.controller('navBarController', ['$scope', '$window', function ($scope, $window) {
			$scope.scrollTop = $window.pageYOffset;
			
		}])
		.controller('loginController', ['$scope', '$window', function ($scope, $window) {
			//$scope.attribute;
			$scope.number = 767;
			$scope.scrollTop = $window.pageYOffset;
		}]);
})();