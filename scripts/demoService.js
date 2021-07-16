
angular.module('demoService', [])

.factory('demo', function($http) {
	demoFactory = {};

	demoFactory.getDemos = function() {
		return $http.get('/api/todaysDemo');
	};

	return demoFactory;
});