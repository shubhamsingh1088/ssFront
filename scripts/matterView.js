
angular.module('matterViewService', [])

.factory('matterView', function($http) {
	matterViewFactory = {};

	matterViewFactory.getMatterText = function() {
		return $http.get('/api/getVoiceCall');
	};

	matterViewFactory.getSelectedMatterText = function(ttsfilename) {
		return $http.get('/api/getSelectedVoiceCall/' + ttsfilename);
	};

	matterViewFactory.deleteSelectedMatterText = function(ttsfilename) {
		return $http.delete('/api/deleteSelectedVoiceCall/' + ttsfilename);
	};

	return matterViewFactory;
});