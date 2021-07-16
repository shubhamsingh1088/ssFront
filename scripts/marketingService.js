
angular.module('marketingUploadService', [])

.factory('marketingUpload', function($http) {
	marketingUploadFactory = {};

	marketingUploadFactory.getMarketingLeadUploads = function() {
		return $http.get('/api/marketing');
	};

	return marketingUploadFactory;
});