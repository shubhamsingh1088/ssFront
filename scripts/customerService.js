
angular.module('customerService', [])

.factory('Customers', function($http) {
	customerFactory = {};

	customerFactory.getCustomers = function() {
		return $http.get('/api/getFormData');
	};

	return customerFactory;
});

