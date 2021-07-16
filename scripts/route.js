
app.config(["$urlRouterProvider", "$stateProvider", "$locationProvider",
	function ($urlRouterProvider, $stateProvider, $locationProvider) {

	$urlRouterProvider.otherwise("/");

	$stateProvider
	.state("main", {
		url: "/",
		views: {
			"": { templateUrl: "templates/main.html" },
			"aside@main": { templateUrl: "templates/aside/aside.html" },
			"carausel@main": { templateUrl: "templates/slider/slide.html" },
			"softwaresList@main": { templateUrl: "templates/softwaresList/softwaresList.html" },
			"mid@main": { templateUrl: "templates/mid/mid.html" },
			"front@main": { templateUrl: "templates/front/front.html", controller: "formController" }
		}
	})
	// .state("mid.eRetail", {
	// 	url: "/eRetail",
	// 	templateUrl: "templates/front/apps/app1.html"
	// })
	.state("reqDemo", {
		url: "/reqDemo",
		templateUrl: "templates/requestDemo/requestDemo.html",
		controller: "formController"
	})
	.state("slotBooking", {
		url: "/slotBooking",
		templateUrl: "templates/slotBooking/slotBooking.html"
	})
	.state("contact", {
		url: "/contact",
		templateUrl: "templates/contact/contact.html",
		controller: "formController"
	})
	.state("academy", {
		url: "/academy",
		templateUrl: "templates/academy/academy.html",
		controller: "formController"
	})
	.state("about", {
		url: "/about",
		templateUrl: "templates/about/about.html"
	})
	.state("retail", {
		url: "/retail",
		templateUrl: "templates/softwares/retail/retail.html",
		controller: "formController"
	})
	.state("pharma", {
		url: "/pharma",
		templateUrl: "templates/softwares/retail/pharma.html",
		controller: "formController"
	})
	.state("jewellery", {
		url: "/jewellery",
		templateUrl: "templates/softwares/retail/jewellery.html",
		controller: "formController"
	})
	.state("restaurent", {
		url: "/restaurent",
		templateUrl: "templates/softwares/retail/restaurent.html",
		controller: "formController"
	})
	.state("pos", {
		url: "/pos",
		templateUrl: "templates/softwares/retail/pos.html",
		controller: "formController"
	})
	.state("garment", {
		url: "/garment",
		templateUrl: "templates/softwares/retail/garment.html",
		controller: "formController"
	})
	.state("kirana", {
		url: "/kirana",
		templateUrl: "templates/softwares/retail/kirana.html",
		controller: "formController"
	})
	.state("salon", {
		url: "/salon",
		templateUrl: "templates/softwares/retail/salon.html",
		controller: "formController"
	})
	.state("fmcg", {
		url: "/fmcg",
		templateUrl: "templates/softwares/distribution/fmcg.html",
		controller: "formController"
	})
	.state("pharma&healthcare", {
		url: "/pharma&healthcare",
		templateUrl: "templates/softwares/distribution/pharma&healthcare.html",
		controller: "formController"
	})
	.state("automobile", {
		url: "/automobile",
		templateUrl: "templates/softwares/distribution/automobile.html",
		controller: "formController"
	})
	.state("warehouse", {
		url: "/warehouse",
		templateUrl: "templates/softwares/distribution/warehouse.html",
		controller: "formController"
	})
	.state("mandi", {
		url: "/mandi",
		templateUrl: "templates/softwares/distribution/mandi.html",
		controller: "formController"
	})
	.state("wholesale", {
		url: "/wholesale",
		templateUrl: "templates/softwares/distribution/electronicAppliances.html",
		controller: "formController"
	})
	.state("text&apparel", {
		url: "/text&apparel",
		templateUrl: "templates/softwares/distribution/text&apparel.html",
		controller: "formController"
	})
	.state("import-exportTrading", {
		url: "/import-exportTrading",
		templateUrl: "templates/softwares/distribution/import-exportTrading.html",
		controller: "formController"
	})
	.state("pharmaceutical", {
		url: "/pharmaceutical",
		templateUrl: "templates/softwares/manufacturing/pharmaceutical.html",
		controller: "formController"
	})
	.state("food&beverage", {
		url: "/food&beverage",
		templateUrl: "templates/softwares/manufacturing/food&beverage.html",
		controller: "formController"
	})
	.state("ayurvedic&homeopathic", {
		url: "/ayurvedic&homeopathic",
		templateUrl: "templates/softwares/manufacturing/ayurvedic&homeopathic.html",
		controller: "formController"
	})
	.state("assembling", {
		url: "/assembling",
		templateUrl: "templates/softwares/manufacturing/assembling.html",
		controller: "formController"
	})
	.state("textile", {
		url: "/textile",
		templateUrl: "templates/softwares/manufacturing/textile.html",
		controller: "formController"
	})
	.state("processManufacturing", {
		url: "/processManufacturing",
		templateUrl: "templates/softwares/manufacturing/processManufacturing.html",
		controller: "formController"
	})
	.state("privacypolicy", {
		url: "/privacypolicy",
		templateUrl: "templates/privacypolicy/privacy.html"
	})
	.state("margSetupDownload", {
		url: "/margSetupDownload",
		templateUrl: "templates/downloads/margSetup.html",
		controller: "margSetupDownload"
	})
	.state("billFormatssss", {
		url: "/billFormatssss",
		templateUrl: "templates/billFormat/billFormat.html",
		controller: "billFormatController"
	})
	.state("formatDetail", {
		url: "/billFormatssss/:formatId",
		templateUrl: "templates/billFormat/formatDetail.html",
		controller: "formatDetail"
	})
	// .state("signup", {
	// 	url: "/signup",
	// 	templateUrl: "templates/login/signup.html",
	// 	controller: "signup",
	// 	authenticated: false
	// })
	.state("activate", {
		url: "/activate/:token",
		templateUrl: "templates/login/activate.html",
		controller: "emailCtrl",
		authenticated: false
	})
	.state("login", {
		url: "/login",
		templateUrl: "templates/login/login.html",
		controller: "profile",
		authenticated: false
	})
	.state("resetUsername", {
		url: "/resetUsername",
		templateUrl: "templates/reset/username.html",
		controller: "resetUsernameCtrl",
		authenticated: false
	})
	.state("resetPassword", {
		url: "/resetPassword",
		templateUrl: "templates/reset/password.html",
		controller: "resetPasswordCtrl",
		authenticated: false
	})
	.state("newPassword", {
		url: "/newPassword/:token",
		templateUrl: "templates/reset/newpassword.html",
		controller: "newPasswordCtrl",
		authenticated: false
	})
	.state("management", {
		url: "/management",
		templateUrl: "templates/admin/management.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.callbacklead", {
		url: "/callbacklead",
		templateUrl: "templates/admin/sideNav/callbacklead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.websitelead", {
		url: "/websitelead",
		templateUrl: "templates/admin/sideNav/websitelead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.marketinglead", {
		url: "/marketinglead",
		templateUrl: "templates/admin/sideNav/marketinglead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.uploadPortalLead", {
		url: "/uploadPortalLead",
		templateUrl: "templates/admin/sideNav/uploadPortalLead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.viewPortalLeads", {
		url: "/viewPortalLeads",
		templateUrl: "templates/admin/sideNav/viewPortalLeads.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.uploadBillFormat", {
		url: "/uploadBillFormat",
		templateUrl: "templates/admin/sideNav/uploadBillFormat.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.viewBillFormat", {
		url: "/viewBillFormat",
		templateUrl: "templates/admin/sideNav/viewBillFormat.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.matterForCalling", {
		url: "/matterForCalling",
		templateUrl: "templates/admin/sideNav/matterForCalling.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.callerId", {
		url: "/callerId",
		templateUrl: "templates/admin/sideNav/callerId.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.uploadLead", {
		url: "/uploadLead",
		templateUrl: "templates/admin/sideNav/uploadLead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.loggedInUsers", {
		url: "/loggedInUsers",
		templateUrl: "templates/admin/sideNav/loggedInUsers.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.createMember", {
		url: "/createMember",
		templateUrl: "templates/admin/sideNav/createMember.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.viewStudentAdmissionData", {
		url: "/viewStudentAdmissionData",
		templateUrl: "templates/admin/sideNav/viewStudentAdmissionData.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("management.viewUpdatedLead", {
		url: "/viewUpdatedLead",
		templateUrl: "templates/admin/sideNav/viewUpdatedLead.html",
		controller: "managementCtrl",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("webLeadForm", {
		url: "/management/:id",
		templateUrl: "templates/leadAction/webleadForm.html",
		controller: "webleadFormController",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("leadAction", {
		url: "/leadAction",
		templateUrl: "templates/leadAction/leadAction.html",
		controller: "leadController",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("leadForm", {
		url: "/leadAction/:id",
		templateUrl: "templates/leadAction/leadForm.html",
		controller: "leadFormController",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("leadCallbackForm", {
		url: "/leadAction/:id",
		templateUrl: "templates/leadAction/leadCallbackForm.html",
		controller: "leadCallbackFormController",
		authenticated: true,
		permission: ["admin", "shubham"]
	})
	.state("portalForm", {
		url: "/portalForm",
		templateUrl: "templates/portalData/portalData.html",
		controller: "portalFormController",
		authenticated: true,
		permission: ["admin", "telecaller"]
	})
	.state("updatePortalForm", {
		url: "/portalForm/:id",
		templateUrl: "templates/portalData/updatePortalData.html",
		controller: "updatePortalFormController",
		authenticated: true,
		permission: ["admin", "telecaller"]
	})
	.state("marketingForm", {
		url: "/marketingForm",
		templateUrl: "templates/marketingForm/marketingForm.html",
		controller: "MarketingFormController"
	})
	.state("landing", {
		url: "/landing",
		templateUrl: "templates/landingPage/landing.html",
		controller: "formController"
	})
	.state("qrcode", {
		url: "/qrcode",
		templateUrl: "templates/qrcode/qrcode.html",
		controller: "qrcodeService"
	})
	.state("registrationForm", {
		url: "/registrationForm",
		templateUrl: "templates/registrationForm/registrationForm.html",
		controller: "registrationForm"
	})
	.state("studentForm", {
		url: "/studentForm",
		templateUrl: "templates/studentForm/studentForm.html",
		controller: "studentForm"
	})
	.state("profile", {
		url: "/profile",
		templateUrl: "templates/user/profile.html",
		controller: "profile",
		authenticated: true
	})
	.state("editUser", {
		url: "/editUser",
		templateUrl: "templates/user/editUser.html",
		controller: "editUserCtrl",
		authenticated: true
	})
	$locationProvider.html5Mode(true);
}]);

app.run(["$transitions", "Auth", "$state", "Login", function($transitions, Auth, $state, Login) {

	$transitions.onStart({
		to: function (state) {
			return state !== null && state.authenticated === true && state.permission !== ["admin", "shubham"];
		}
	}, function (state) {
		if (!Auth.isLoggedIn()) {
			return $state.target("main");
		} else if (!state.permission) {
			Login.getPermission();
		}
	});
	$transitions.onStart({
		to: function (state) {
			return state !== null && state.authenticated === false;
		}
	}, function (state) {
		if (Auth.isLoggedIn()) {
			return $state.target("profile");
		}
	});

}]);