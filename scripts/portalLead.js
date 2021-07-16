
angular.module('portalLeadService', [])

.factory('portalLead', function($http) {
	portalLeadFactory = {};

	portalLeadFactory.getPortalLead = function() {
		return $http.get('/api/getPortalLead');
	};

	portalLeadFactory.getAssignedLead = function() {
		return $http.get('/api/assignedLead');
	};

	portalLeadFactory.getAllAssignedLead = function() {
		return $http.get('/api/allAssignedLead');
	};

	portalLeadFactory.getSinglePortalLead = function(id) {
		return $http.get('/api/getSinglePortalLead/' + id);
	};

	portalLeadFactory.getUpdatedLead = function() {
		return $http.get('/api/getUpdatedLead');
	};

	return portalLeadFactory;
});