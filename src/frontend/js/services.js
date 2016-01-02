(function () {
	angular.module('ccmind.services', [])

		.factory('ccmindJoinService', ['$http', '$q', function ($http, $q) {
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
          	console.log('Join successful: ' + response.data)
          	deferred.resolve( response.data );
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

		.factory('ccmindLoginService', ['$http', '$q', function ($http, $q) {
			var apiLogin = '/api/session/login';

			function login (email, password) {
        var deferred = $q.defer();
        $http({
          method: 'POST',
          url: apiLogin,
          data: {
          	username: email,
          	password: password
          }
        })
        .then(
          function (response) {
          	console.log('Login successful: ' + response.data)
          	deferred.resolve( response.data );
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