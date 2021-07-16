
angular.module('studentFormService', [])

.factory('studentForm', function($http) {
	studentFormFactory = {};

	studentFormFactory.getStudentData = function() {
		return $http.get('/api/studentFormData');
	};

	return studentFormFactory;
});