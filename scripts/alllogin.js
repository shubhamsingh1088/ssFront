angular.module('loginService', [])

.factory('Login', function($http) {
	loginFactory = {};

	loginFactory.create = function(regData) {
		return $http.post('/api/login', regData);
	};

	loginFactory.getAllLoginUsers = function() {
		return $http.get('/api/management/');
	};

	loginFactory.getPermission = function() {
		return $http.get('/api/permission/');
	};

	loginFactory.getTeleCallerPermission = function() {
		return $http.get('/api/getTeleCallerPermission');
	};

	loginFactory.deleteOneLoginUser = function(username) {
		return $http.delete('/api/loggedInUser/' + username);
	};

	loginFactory.getUser = function() {
		return $http.get('/api/profile/');
	};

	return loginFactory;
});

