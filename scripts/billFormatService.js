
angular.module('billformatUploadService', [])

.factory('billformatUpload', function($http) {
	formatUploadFactory = {};

	formatUploadFactory.getFormatUploads = function() {
		return $http.get('/api/billFormat');
	};

	formatUploadFactory.getFormatById = function(formatId) {
		return $http.get('/api/getSelectedFormat/' + formatId);
	};

	formatUploadFactory.deleteFormat = function(name) {
		return $http.delete('/api/deleteFormat/' + name);
	};

	return formatUploadFactory;
});