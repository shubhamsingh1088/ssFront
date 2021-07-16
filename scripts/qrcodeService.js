
angular.module('qrcodeService', [])

.factory('QrCode', function($http) {
	qrcodeFactory = {};

	qrcodeFactory.getQr = function() {
		return $http.get('api/qrcode');
	};

	return qrcodeFactory;
});