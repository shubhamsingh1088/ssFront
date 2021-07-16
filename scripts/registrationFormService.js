
angular.module('registrationFormService', [])

.factory('registrationForm', function($http) {
	registrationFactory = {};

	registrationFactory.getRegistrationFormData = function() {
		return $http.get('/api/registrationForm');
	};

	return registrationFactory;
});