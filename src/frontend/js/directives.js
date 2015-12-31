(function () {
	angular.module('ccmind.directives', [])
		.directive('ccmindJoin', function () {
			return {
				restrict: 'E',
				templateUrl: 'partials/ccmind-join.html'
			};
		})

		.directive('ccmindLogin', function () {
			return {
				restrict: 'E',
				templateUrl: 'partials/ccmind-login.html'
			};
		});
		/*.directive('ccmindJoin', function () {
			return {
				restrict: 'E',
				templateUrl: 'partials/ccmind-join.html',
				controller: 'joinController'
			};
		})*/
})();