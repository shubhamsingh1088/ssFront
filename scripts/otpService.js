
angular.module('otpService', [])

.factory('Otp', function($http) {
	otpFactory = {};

	otpFactory.getOtp = function() {
		return $http.get('/api/getOtp');
	};

	return otpFactory;
});