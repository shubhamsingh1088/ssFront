

angular.module('leadUploadService', [])

.factory('leadUpload', function($http) {
	leadUploadFactory = {};

	leadUploadFactory.getLeadUploads = function() {
		return $http.get('/api/getLeads');
	};

	leadUploadFactory.getLeadById = function(id) {
		return $http.get('/api/getSelectedLead/' + id);
	};

	leadUploadFactory.getWebLeadById = function(id) {
		return $http.get('/api/getWebSelectedLead/' + id);
	}

	leadUploadFactory.getForwardLeadsUploads = function() {
		return $http.get('/api/getForwardLeads');
	};

	leadUploadFactory.getForwardLeadById = function(id) {
		return $http.get('/api/getSelectedForwardLead/' + id);
	};

	leadUploadFactory.getCallbackLeadsUploads = function() {
		return $http.get('/api/getCallbackLeads');
	};

	return leadUploadFactory;
});