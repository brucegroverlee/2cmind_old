(function () {
	angular.module('ccmind.services', [])

		.factory('ccmindJoinService', ['$http', '$q', function ($http, $q) {
			var apiJoin = '/api/profile/join';
			
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
          	deferred.resolved(response);
          }, 
          function (response) {
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
			var apiLogin = '/api/profile/login';

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
          	deferred.resolved(response);
          }, 
          function (response) {
          	deferred.reject({error: 'error 500'});
          }
        )
        return deferred.promise;
			}

			return {
				login: login
			};
		}]);
})();