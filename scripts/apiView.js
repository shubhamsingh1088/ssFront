
angular.module('apiViewService', [])

.factory('apiView', function($http) {
	apiViewFactory = {};

	// apiViewFactory.getKeys = function() {
	// 	return $http.get('/api/getApiKeys');
	// };

	apiViewFactory.getCallerId = function() {
		return $http.get('/api/getCallerId');
	};

	apiViewFactory.getSelectedCallerId = function(number) {
		return $http.get('/api/getSelectedCallerId/' + number);
	};

	return apiViewFactory;
});