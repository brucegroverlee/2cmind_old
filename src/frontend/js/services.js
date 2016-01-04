(function () {
	angular.module('ccmind.services', [])

		.factory('ccmindJoinService', ['$http', '$q', '$window', function ($http, $q, $window) {
			var apiJoin = '/api/session/join';
			
			function join (name, email, password) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: apiJoin,
          data: {
          	name: name,
          	email: email,
          	password: password
          }
        })
        .then(
          function (response) {
          	console.log('Join successful')
          	console.log(response.data)
          	deferred.resolve( response.data );
          	$window.location.href = '/d';
          }, 
          function (response) {
          	console.log('Join failed')
          	deferred.reject({error: 'error 500'});
          }
        )
        return deferred.promise;
			}

			return {
				join: join
			};

		}])

		.factory('ccmindLoginService', ['$http', '$q', '$window', function ($http, $q, $window) {
			var apiLogin = '/api/session/login';

			function login (email, password) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: apiLogin,
          data: {
          	email: email,
          	password: password
          }
        })
        .then(
          function (response) {
          	console.log('Login successful')
          	console.log(response.data)
          	deferred.resolve( response.data );
          	$window.location.href = '/d';
          }, 
          function (response) {
          	console.log('Login failed')
          	deferred.reject( response );
          }
        )
        return deferred.promise;
			}

			return {
				login: login
			};
		}]);
})();