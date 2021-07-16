
angular.module('fileUploadService', [])

.factory('fileUpload', function($http) {
	fileUploadFactory = {};
	
	fileUploadFactory.getFileRetailPharmaUploads = function() {
		return $http.get('/api/tradeRetailPharmacyCustomers');
	};

	fileUploadFactory.getFileWholesalePharmaUploads = function() {
		return $http.get('/api/tradeWholesalePharmacyCustomers');
	};

	fileUploadFactory.getFileRetailFmcgUploads = function() {
		return $http.get('/api/tradeRetailfmcgCustomers');
	};

	fileUploadFactory.getFileWholesaleFmcgUploads = function() {
		return $http.get('/api/tradeWholesalefmcgCustomers');
	};

	fileUploadFactory.getFileReadyMadeUploads = function() {
		return $http.get('/api/tradereadymadeCustomers');
	};

	fileUploadFactory.getFileJewelleryUploads = function() {
		return $http.get('/api/tradejewelleryCustomers');
	};

	fileUploadFactory.deleteFileUploads = function() {
		return $http.delete('/api/tradeCustomers');
	}

	return fileUploadFactory;
});

