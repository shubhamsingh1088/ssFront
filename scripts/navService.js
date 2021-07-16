
angular.module('navbarService', [])

.factory('Navbar', function() {
	navbarFactory = {};

	navbarFactory.openNavbar = function() {
		return {
			openModal: function() {
				function myFunction() {
					var x = document.getElementById("myTopnav");
					if (x.className === "topnav") {
						x.className += " responsive";
					} else {
						x.className = "topnav";
					}
				}
			}
		};
	};

	return navbarFactory;
});