
var app = angular.module("margSoftware", ["ui.router", "authService", "loginService", "fileUploadService", 
  "customerService", "matterViewService", "apiViewService", "leadUploadService", "marketingUploadService", 
  "demoService", "billformatUploadService", "otpService", "portalLeadService", "qrcodeService",
  "registrationFormService", "studentFormService"])
.run(function($anchorScroll, $window) {
  // hack to scroll to top when navigating to new URLS but not back/forward
  var wrap = function(method) {
    var orig = $window.window.history[method];
    $window.window.history[method] = function() {
      var retval = orig.apply(this, Array.prototype.slice.call(arguments));
      $anchorScroll();
      return retval;
    };
  };
  wrap('pushState');
  wrap('replaceState');
})

app.config(function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('AuthInterceptors');
});

app.directive("match", function() {
  return {
    restrict: "A",
    controller:  function($scope) {

      $scope.confirmed = false;

      $scope.doConfirm = function(values) {
        values.forEach(function(ele) {

          if ($scope.confirm == ele) {
            $scope.confirmed = true;
          } else {
            $scope.confirmed = false;
          }

        });
      }
    },
    link: function($scope, element, attrs) {
      attrs.$observe("match", function() {
        $scope.matches = JSON.parse(attrs.match);
        $scope.doConfirm($scope.matches);
      });

      $scope.$watch("confirm", function() {
        $scope.matches = JSON.parse(attrs.match);
        $scope.doConfirm($scope.matches);
      });

    }
  };
});

app.controller("formController", ["$scope", "$location", "$timeout", function($scope, $location, $timeout) {

  $scope.register = function(valid) {

    $scope.disabled = false;
    $scope.msg = false;
    $scope.successMsg = false;

    if (valid) {
      $scope.disabled = true;
      $scope.successMsg = true;
      $scope.successMsg = 'Your Form Is Successfully Submitted';

      $.post("api/users", { number: $scope.number, name: $scope.name, pincode: $scope.pincode }, function(res) {
        $timeout(function() {
            $location.path("/");
          }, 2000);
      });

      $.post("api/sendSms", { number: $scope.number }, function(res) {
        $timeout(function() {
            $location.path("/");
          }, 2000);
      });

      $.post("api/sendSmsToAdmin", { number: $scope.number, name: $scope.name, pincode: $scope.pincode }, function(res) {
        $timeout(function() {
            $location.path("/");
          }, 2000);
      });

    } else {
      $scope.msg = true;
      $scope.msg = 'Please ensure if form is filled out properly';
    }

  };

  $scope.showERetail = true;
  $scope.showEOrder = false;
  $scope.showEOwner = false;

  $scope.viewERetail = function() {
    $scope.showERetail = true;
    $scope.showEOrder = false;
    $scope.showEOwner = false;
  }
  $scope.viewEOrder = function() {
    $scope.showERetail = false;
    $scope.showEOrder = true;
    $scope.showEOwner = false;
  }
  $scope.viewEOwner = function() {
    $scope.showERetail = false;
    $scope.showEOrder = false;
    $scope.showEOwner = true;
  }

}]);

app.controller("studentForm", ["$scope", "$location", "$timeout", function($scope, $location, $timeout) {

  $scope.registerStudent = function() {
    $scope.msg = false;
    $scope.successMsg = false;
    $scope.disabled = false;
    $.post("/api/studentForm", { firstName: $scope.firstName, lastName: $scope.lastName, email: $scope.email,
     fatherName: $scope.fatherName, contactNo: $scope.contactNo, gender: $scope.gender.model, dob: $scope.dob,
     pincode: $scope.pincode, currentAddress: $scope.currentAddress }, function(res) {
      if (res.success) {
        $scope.successMsg = true;
        $scope.successMsg = "Your Form Has Been Successfully Submitted";
        $scope.disabled = true;
      } else {
        $scope.msg = true;
        $scope.msg = "Email or Number is already taken";
      }
    });
  };

  $scope.gender = {
    model: null,
    availableOptions: [
       { name: "Male" },
       { name: "Female" },
       { name: "Other" }
    ]
  };

}]);

app.controller('margSetupDownload', ['$scope', function($scope) {

	$scope.register = function(valid) {
		$scope.disabled = false;
		$scope.msg = false;
		$scope.successMsg = false;

		if (valid) {
			$scope.disabled = true;
			$scope.successMsg = true;
			$scope.successMsg = 'Your Form Is Successfully Submitted, Please Wait Your Setup is Downloading';

			$.post("api/users", { number: $scope.number, name: $scope.name, pincode: $scope.pincode }, function(res) {
        window.location.assign('api/margSetup');
        // window.location.reload(true);
      });
      $.post("api/sendSmsToAdmin", { number: $scope.number, name: $scope.name, pincode: $scope.pincode }, function(res) {});
		} else {
			$scope.msg = true;
			$scope.msg = 'Please ensure if form is filled out properly';
		}
	};

}]);

app.controller('registrationForm', ["$scope", "registrationForm", "$window", "$location", function($scope, registrationForm, $window, $location) {

  $scope.submitRegForm = function() {
    $.post('api/registrationForm', { cName: $scope.cName, number: $scope.number, address: $scope.address,
     serialno: $scope.serialno, finalAmount: $scope.finalAmount }, function(res) {
      $scope.msg = res;
      // window.location.reload(true);
    });

    $.post("api/sendTextToAdmin", { cName: $scope.cName, number: $scope.number, address: $scope.address,
     serialno: $scope.serialno, finalAmount: $scope.finalAmount }, function(res) {
      console.log(res);
      // window.location.reload(true);
     });
  };
  
}]);

app.controller('qrcodeService', ["$scope", "QrCode", function($scope, QrCode) {
  QrCode.getQr().then(function(response) {
    $scope.url = response.data;
  });
}]);

  // function getRegistrationFormData() {
  //   registrationForm.getRegistrationFormData().then(function(response) {
  //     if (response.data.success) {
  //       $scope.registrationFormDatas = response.data.result;
  //     } else {
  //       $scope.errorMsg = 'There is some Error';
  //     }
  //   });
  // }
  // getRegistrationFormData();

// }]);

app.controller("signup", ["$scope", "Login", "$location", "$timeout", function($scope, Login, $location, $timeout) {

  $scope.addUser = function(regData, valid) {
    $scope.disabled = true;
    $scope.errorMsg = false;

    if (valid) {
      Login.create($scope.regData).then(function (response) {
        if (response.data.success) {
          $scope.loading = false;
          $scope.successMsg = response.data.message;
          window.location.reload(true);
        } else {
          $scope.loading = false;
          $scope.disabled = false;
          $scope.errorMsg = response.data.message;
        }
      });
    } else {
      $scope.disabled = false;
      $scope.loading = false;
      $scope.errorMsg = 'Please ensure form is filled out properly';
    }
  };

}]);

app.controller('emailCtrl', ["$scope", "$stateParams", "Login", "$timeout", "$location", function($scope, $stateParams, Login, $timeout, $location) {
  Login.activateAccount($stateParams.token).then(function (response) {
    $scope.successMsg = false;
    $scope.errorMsg = false;

    if (response.data.success) {
      $scope.successMsg = response.data.message + '...redirecting';
      $timeout(function() {
        $location.path("/login");
      }, 2000);
    } else {
      $scope.errorMsg = response.data.message + '...redirecting';
      $timeout(function() {
        $location.path("/login");
      }, 2000);
    }
  });
}]);

app.controller("profile", ["$scope", "Auth", "$timeout", "$location", "localStorageService", "$transitions", "$interval", 
  "$state", "AuthToken", "Login", function($scope, Auth, $timeout, $location, localStorageService, $transitions, $interval, $state, AuthToken, Login) {

    $scope.loadMe = false;

  $scope.checkSession = function() {
    if (Auth.isLoggedIn()) {
      $scope.checkingSession = true;
      var interval = $interval(function() {
        var token = localStorageService.get('token');
        if (token === null) {
          $interval.cancel(interval);
        } else {
          self.parseJwt = function(token) {
            var base64Url = token.split('.')[1];
            var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            return JSON.parse(atob(base64));
          }
          var expireTime = self.parseJwt(token);
          var timeStamp = Math.floor(Date.now() / 1000);
          var timeCheck = expireTime.exp - timeStamp;
          if (timeCheck <= 10) {
            showModal(1);
            $interval.cancel(interval);
          }
        }
      }, 20000);
    }
  };

  $scope.checkSession();

  var showModal = function(option) {
    $scope.choiceMade = false;
    $scope.modalHeader = undefined;
    $scope.modalBody = undefined;
    $scope.hideButton = false;

    if (option === 1) {
      $scope.modalHeader = "Timeout warning";
      $scope.modalBody = "Your session will expire in 10 seconds. Would you like to renew your session.?";
      $("#myModal").modal({ backdrop: "static" });
    } else if (option === 2) {
      $scope.hideButton = true;
      $scope.modalHeader = "Logging out";
      $("#myModal").modal({ backdrop: "static" });
      $timeout(function() {
        Auth.logout();
        $location.path('/main');
        hideModal();
        window.location.reload(true);
      }, 1000);
    }
    $timeout(function () {
      if (!$scope.choiceMade) {
        hideModal();
      }
    }, 10000);
  };

  $scope.renewSession = function() {
    $scope.choiceMade = true;

    Login.renewSession($scope.Username).then(function(response) {
      if (response.data.success) {
        AuthToken.setToken(response.data.token);
        $scope.checkSession();
      } else {
        $scope.modalBody = response.data.message;
      }
    });
    hideModal();
  };

  $scope.endSession = function() {
    $scope.choiceMade = true;
    hideModal();
    $timeout(function() {
      showModal(2);
    }, 2000);
  };

  var hideModal = function() {
    $("#myModal").modal('hide');
  };

  $transitions.onStart({}, function() {

    if (!$scope.checkSession) {
      $scope.checkSession();
    }

    if (Auth.isLoggedIn()) {
      $scope.isLoggedIn = true;

      Login.getUser().then(function (response) {
        $scope.Username = response.data.user.username;
        $scope.Name = response.data.user.name;
        $scope.Email = response.data.user.email;
        $scope.Number = response.data.user.number;
        $scope.Id = response.data.user._id;
        $scope.permission = response.data.permission;

        Login.getPermission().then(function (response) {
          if (response.data.permission === "admin" || response.data.permission === "shubham") {
            $scope.authorized = true;
            $scope.loadme = true;
          } else {
            $scope.loadme = true;
          }
        });

      });

    } else {
      $scope.isLoggedIn = false;
      $scope.username = '';
      $scope.loadme = true;
    }
    if ($location.hash() == '_=_') $location.hash(null);
    $scope.disabled = false;
    $scope.errorMsg = false;
  });

  $scope.doLogin = function(loginData) {
    $scope.errorMsg = false;
    $scope.expired = false;
    $scope.disabled = false;

    Auth.login($scope.loginData).then(function(response) {
      if (response.data.success) {
        $scope.disabled = true;
        $scope.successMsg = response.data.message + "....Redirecting";
        $timeout(function() {
          $location.path('/profile');
        }, 2000);
      } else {
        console.log(response);
        if (response.data.expired) {
          $scope.expired = true;
          $scope.errorMsg = response.data.message;
        } else {
          $scope.loading = false;
          $scope.errorMsg = response.data.message;
        }
      }
    });
  }

  $scope.logout = function() {
    showModal(2);
  };

}]);

app.controller("managementCtrl", ["$scope", "fileUpload", "Customers", "Login", "matterView", "$location", "$stateParams", 
  "apiView", "$location", "$timeout", "$window", "leadUpload", "marketingUpload", "demo", "billformatUpload", "portalLead", 
  "studentForm", function($scope, fileUpload, Customers, Login, matterView, $location, $window, $stateParams, apiView, $location, $timeout, leadUpload, marketingUpload, demo, billformatUpload, portalLead, studentForm) {

    $scope.isLoggedIn = false;
    $scope.accessDenied = true;
    $scope.errorMsg = false;
    $scope.ifUser = false;

    Login.getPermission().then(function(response) {
      if (response.data.success) {
        if (response.data.permission === "admin" || response.data.permission === "shubham") {
          $scope.ifUser = true;
        } else {
          $scope.errorMsg = 'There is no user in db';
        }
      } else {
        $scope.errorMsg = response.data.message;
      }
    });

    function getAllLoginUsers() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            $scope.loggedInUsers = response.data.allUsers;
            $scope.accessDenied = false;
            $scope.isLoggedIn = true;
          } else {
            $scope.errorMsg = 'Insufficient Permission';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getAllLoginUsers();

    function getCustomers() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            Customers.getCustomers().then(function(response) {
              if (response.data.success) {
                $scope.isLoggedIn = true;
                $scope.accessDenied = false;
                $scope.users = response.data.customers;
              } else {
                $scope.errorMsg = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getCustomers();

    function getFormatUploads() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            billformatUpload.getFormatUploads().then(function(response) {
              if (response.data.success) {
                $scope.billFormats = response.data.billFormat;
              } else {
                $scope.msg = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getFormatUploads();

    $scope.deleteFormat = function(name) {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            billformatUpload.deleteFormat(name).then(function(response) {
              if (response.data.success || $window.confirm("Are you sure you want t delete.?")) {
                getFormatUploads();
              } else {
                $scope.showMoreError = 'Error';
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    $scope.sendSmsToData = function() {
      var number;
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            angular.forEach($scope.portalDatas, function(portalData) {
              number = portalData.number;
              $.post("api/sendSmsToData", { number: number }, function(res) {});
              $scope.portalMsg = "Text Sms has been successfully send";
              $timeout(function() {
                window.location.reload(true);
              }, 2000);
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
      return number;
    };

    $scope.deleteWebsiteLead = function(_id) {
      var _id;

      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            angular.forEach($scope.users, function(user) {
              var _id = user._id;
              console.log(_id);
              $.post("api/deleteFormData", { _id: _id }, function(res) {
                getCustomers();
              });
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
      return _id;
    }

    $scope.deleteUser = function(username) {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            Login.deleteOneLoginUser(username).then(function(response) {
              if (response.data.success) {
                getAllLoginUsers();
              } else {
                $scope.showMoreError = 'Error';
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    $scope.leadInputUpload = function() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            $.post("api/leadInputUpload", { name: $scope.name, number: $scope.number, created: $scope.created }, function(response){
              console.log("Lead added Successfully");
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    function getMarketingLeadUploads() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            marketingUpload.getMarketingLeadUploads().then(function(response) {
              if (response.data.success) {
                $scope.marketings = response.data.marketing;
              } else {
                $scope.errorMsg = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getMarketingLeadUploads();

    $scope.showMore = function(num) {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            $scope.showMoreError = false;
            if (num > 0) {
              $scope.limit = num;
            } else {
              $scope.showMoreError = "Please enter a valid number";
            }
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    $scope.showAll = function() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            $scope.limit = undefined;
            $scope.showMoreError = false;
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    $scope.deleteFileUploads = function() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            fileUpload.deleteFileUploads().then(function(response) {
              getFileUploads();
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    function getForwardLeadsUploads() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            leadUpload.getForwardLeadsUploads().then(function(response) {
              if (response.data.success) {
                $scope.forwardLeads = response.data.forwardLeads;
              } else {
                $scope.errorMsg = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getForwardLeadsUploads();

    $scope.getAllForwardLeads = function() {
      $scope.isForward = true;
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            leadUpload.getForwardLeadsUploads().then(function(response) {
              if (response.data.success) {
                $scope.isForward = true;
                $scope.isDemo = false;
                $scope.forwardLeads = response.data.forwardLeads;
              } else {
                $scope.errorMsg = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    };

    studentForm.getStudentData().then(function(response) {
      if (response.data.success) {
        $scope.studentData = response.data.data;
      } else {
        $scope.message = response.data.message;
      }
    });

    function getPortalLead() {
      Login.getAllLoginUsers().then(function(response) {
        if (response.data.success) {
          if (response.data.permission === "admin") {
            portalLead.getPortalLead().then(function(response) {
              if (response.data.success) {
                $scope.portalDatas = response.data.portalLead;
              } else {
                $scope.message = response.data.message;
              }
            });
          } else {
            $scope.errorMsg = 'There is no user in db';
          }
        } else {
          $scope.errorMsg = response.data.message;
        }
      });
    }
    getPortalLead();

    portalLead.getUpdatedLead().then(function(response) {
      if (response.data.success) {
        $scope.updatedLead = response.data.result;
      } else {
        $scope.message = response.data.message;
      }
    });

    Login.getTeleCallerPermission().then(function(response) {
      if (response.data.success) {
        $scope.telecaller = {
          model: null,
          availableOptions: response.data.user
        };
      } else {
        $scope.message = response.data.message;
      }
    });

    $scope.selectedLead = {
      model: null,
      availableOptions: [
      { value: "50" },
      { value: "100" },
      { value: "150" }
      ]
    };

    $scope.assignLead = function() {
      for(var n in $scope.portalDatas) {
        $.post("/api/assignedLead", { userId: $scope.telecaller.model, portalId: $scope.portalDatas[n]._id,
         name: $scope.portalDatas[n].name, number: $scope.portalDatas[n].number, trade: $scope.portalDatas[n].trade },
         function(res) {
          window.location.reload(true);
        });
        $.post("/api/deletePortalLead", { data: $scope.portalDatas }, function(res) {
          window.location.reload(true);
        });
      };
    };

    portalLead.getAllAssignedLead().then(function(response) {
      if (response.data.success) {
        $scope.allAssignedLeads = response.data.assignedLead;
      } else {
        $scope.message = response.data.message;
      }
    });

    $scope.bGroup = {
      model: null,
      availableOptions: [
      { name: "A+" },
      { name: "A-" },
      { name: "B+" },
      { name: "B-" },
      { name: "O+" },
      { name: "O-" },
      { name: "AB+" },
      { name: "AB-" }
      ]
    };

    $scope.gender = {
      model: null,
      availableOptions: [
      { name: "Male" },
      { name: "Female" },
      { name: "Other" }
      ]
    };

    $scope.trade = {
      model: null,
      availableOptions: [
      { name: "pharma retail" },
      { name: "pharma wholesale" },
      { name: "fmcg retail" },
      { name: "fmcg wholesale" },
      { name: "jewellery" },
      { name: "readymade garments" }
      ]
    };

}]);

app.controller("portalFormController", ["$scope", "Login", "portalLead", function($scope, Login, portalLead) {
  portalLead.getAssignedLead().then(function(response) {
    if (response.data.success) {
      $scope.assignedDatas = response.data.result;
    } else {
      $scope.message = response.data.message;
    }
  });
}]);

app.controller("updatePortalFormController", ["$scope", "Login", "$stateParams", "portalLead", "$timeout", "$location", function($scope, Login, $stateParams, portalLead, $timeout, $location) {

  
  portalLead.getSinglePortalLead($stateParams.id).then(function(response) {
    $scope.assignedLeadId = response.data.singleData._id;
    $scope.singleDataName = response.data.singleData.portalDatas[0].name;
    $scope.singleDataNumber = response.data.singleData.portalDatas[0].number;
    $scope.singleDataId = response.data.singleData.portalDatas[0]._id;
  });
    

  $scope.trade = {
    model: null,
    availableOptions: [
    { name: "pharma retail" },
    { name: "pharma wholesale" },
    { name: "fmcg retail" },
    { name: "fmcg wholesale" },
    { name: "jewellery" },
    { name: "readymade garments" }
    ]
  };

  $scope.updatePortalForm = function() {
    $.post("api/updatePortalLead", { _id: $scope.singleDataId, name: $scope.singleDataName, number: $scope.singleDataNumber, address: $scope.address, represantativeName: $scope.Username, represantativeNumber: $scope.Number, 
      remarks: $scope.remarks, demoDate: $scope.demoDate, trade: $scope.trade.model, businessType: $scope.businessType }, function(res) {
        console.log(res);
        $timeout(function() {
          $location.path("/portalForm");
        }, 2000);
      });
    $.post("api/deleteUsedPortalLead", { _id: $scope.assignedLeadId }, function(res) {
      $timeout(function() {
        $location.path("/portalForm");
      }, 2000);
    });
  };

}]);

app.controller("resendActivation", ["$scope", "Login", function($scope, Login) {

  $scope.checkCredentials = function(loginData) {
    $scope.disabled = true;
    $scope.errorMsg = false;
    $scope.successMsg = false;

    Login.checkCredentials(loginData).then(function(response) {
      if (response.data.success) {
        Login.resendLink(loginData).then(function(response) {
          if (response.data.success) {
            $scope.successMsg = response.data.message;
          }
        });
      } else {
        $scope.disabled = false;
        $scope.errorMsg = response.data.message;
      }
    });
  }
}]);

app.controller("resetUsernameCtrl", ["$scope", "Login", function($scope, Login) {

  $scope.sendUsername = function(userData, valid) {
    $scope.errorMsg = false;
    $scope.disabled = true;

    if (valid) {
      Login.sendUsername(userData.email).then(function(response) {
        if (response.data.success) {
          $scope.successMsg = response.data.message;
        } else {
          $scope.disabled = false;
          $scope.errorMsg = response.data.message;
        }
      });
    } else {
      $scope.disabled = false;
      $scope.errorMsg = 'Please enter a valid e-mail';
    }
  };

}]);

app.controller("resetPasswordCtrl", ["$scope", "Login", function($scope, Login) {

   $scope.sendPassword = function(resetData, valid) {
    $scope.errorMsg = false;
    $scope.disabled = true;

    if (valid) {
      Login.sendPassword(resetData).then(function(response) {
        if (response.data.success) {
          $scope.successMsg = response.data.message;
        } else {
          $scope.disabled = false;
          $scope.errorMsg = response.data.message;
        }
      });
    } else {
      $scope.disabled = false;
      $scope.errorMsg = 'Please enter a valid username';
    }
  };

}]);

app.controller("newPasswordCtrl", ["$scope", "$stateParams", "Login", "$timeout", "$location", function($scope, $stateParams, Login, $timeout, $location) {

  $scope.hide = true;

  Login.resetUser($stateParams.token).then(function(response) {
    if (response.data.success) {
      $scope.hide = false;
      $scope.successMsg = "Please enter a new password";
      $scope.username = response.data.user.username;
    } else {
      $scope.errorMsg = response.data.message;
    }
  });

  $scope.savePassword = function(regData, valid, confirmed) {
    $scope.errorMsg = false;
    $scope.disabled = true;

    if (valid && confirmed) {
      $scope.regData.username = $scope.username;
      Login.savePassword(regData).then(function(response) {
        if (response.data.success) {
          $scope.successMsg = response.data.message + '...Redirecting';
          $timeout(function() {
            $location.path("/login");
          }, 2000);
        } else {
          $scope.disabled = false;
          $scope.errorMsg = response.data.message;
        }
      });
    } else {
      $scope.disabled = false;
      $scope.errorMsg = "Please ensure form is filled out properly";
    }
  }

}]);

app.controller("leadController", ["$scope", "$stateParams", "leadUpload", "Login", function($scope, $stateParams, leadUpload, Login) {

  function getLeadUploads() {
    Login.getAllLoginUsers().then(function(response) {
      if (response.data.success) {
        if (response.data.permission === "admin") {
          leadUpload.getLeadUploads().then(function(response) {
            if (response.data.success) {
              $scope.leads = response.data.leads;
            } else {
              $scope.errorMsg = response.data.message;
            }
          });
        } else {
          $scope.errorMsg = 'There is no user in db';
        }
      } else {
        $scope.errorMsg = response.data.message;
      }
    });
  }
  getLeadUploads();

  function getForwardLeadsUploads() {
    Login.getAllLoginUsers().then(function(response) {
      if (response.data.success) {
        if (response.data.permission === "admin" || response.data.permission === "shubham") {
          leadUpload.getForwardLeadsUploads().then(function(response) {
            if (response.data.success) {
              $scope.forwardLeads = response.data.forwardLeads;
            } else {
              $scope.msg = response.data.message;
            }
          });
        } else {
          $scope.errorMsg = 'There is no user in db';
        }
      } else {
        $scope.errorMsg = response.data.message;
      }
    });
  }
  getForwardLeadsUploads();

  function getCallbackLeadsUploads() {
    Login.getAllLoginUsers().then(function(response) {
      if (response.data.success) {
        if (response.data.permission === "admin" || response.data.permission === "shubham") {
          leadUpload.getCallbackLeadsUploads().then(function(response) {
            if (response.data.success) {
              $scope.callbackLeads = response.data.callbackLeads;
            } else {
              $scope.msg = response.data.message;
            }
          });
        } else {
          $scope.errorMsg = 'There is no user in db';
        }
      } else {
        $scope.errorMsg = response.data.message;
      }
    });
  }
  getCallbackLeadsUploads();

  // $scope.selectMe = function (event) {
  //   $("#myModal").modal("show");
  // }

}]);

app.controller("webleadFormController", ["$scope", "$stateParams", "leadUpload", "$timeout", "$location",
  function($scope, $stateParams, leadUpload, $timeout, $location) {

  leadUpload.getWebLeadById($stateParams.id).then(function(response) {
    $scope.webLead = response.data.webLead;
  });

  $scope.trade = {
    model: null,
    availableOptions: [
       { name: "pharma retail" },
       { name: "pharma wholesale" },
       { name: "fmcg retail" },
       { name: "fmcg wholesale" },
       { name: "jewellery" },
       { name: "readymade garments" }
    ]
  };

  $scope.forwardLead = function() {

    $.post("api/forwardLeads", { _id: $scope.webLead._id, name: $scope.webLead.name, number: $scope.webLead.number, address: $scope.address, represantativeName: $scope.represantativeName, represantativeNumber: $scope.represantativeNumber, 
      remarks: $scope.remarks, demoDate: $scope.demoDate, trade: $scope.trade.model, businessType: $scope.businessType },
      function(res) {
        $scope.message = 'Lead Is Successfully Forwarded';
        $timeout(function() {
          $location.path("/management");
        }, 2000);
    });

    $.post("api/sendSmsToSalesPerson", { name: $scope.webLead.name, number: $scope.webLead.number, address: $scope.address,
      represantativeName: $scope.represantativeName, represantativeNumber: $scope.represantativeNumber, 
      remarks: $scope.remarks, demoDate: $scope.demoDate, businessType: $scope.businessType }, function(res) {
        $timeout(function() {
          $location.path("/management");
        }, 2000);
    });

    // $.post("api/sendSmsToLeadCustomer", { name: $scope.webLead.name, number: $scope.webLead.number, address: $scope.address,
    //   represantativeName: $scope.represantativeName, represantativeNumber: $scope.represantativeNumber, 
    //   demoDate: $scope.demoDate }, function(res) {
    //   console.log(res);
    // });

    $.post("api/deleteWebLeadFromLeads", { _id: $scope.webLead._id }, function(res) {
      $timeout(function() {
        $location.path("/management");
      }, 2000);
    });

  };

}]);

app.controller("leadFormController", ["$scope", "$stateParams", "leadUpload", "$timeout", "$location",
  function($scope, $stateParams, leadUpload, $timeout, $location) {

  leadUpload.getLeadById($stateParams.id).then(function(response) {
    $scope.lead = response.data.lead;
  });

  $scope.trade = {
    model: null,
    availableOptions: [
       { name: "pharma retail" },
       { name: "pharma wholesale" },
       { name: "fmcg retail" },
       { name: "fmcg wholesale" },
       { name: "jewellery" },
       { name: "readymade garments" }
    ]
  };

  $scope.forwardLead = function() {

    $.post("api/forwardLeads", { _id: $scope.lead._id, name: $scope.lead.name, number: $scope.lead.number, address: $scope.address, represantativeName: $scope.Username, represantativeNumber: $scope.Number, 
      remarks: $scope.remarks, demoDate: $scope.demoDate, trade: $scope.trade.model, businessType: $scope.businessType },
      function(res) {
        $scope.message = 'Lead Is Successfully Forwarded';
        $timeout(function() {
          $location.path("/leadAction");
        }, 2000);
    });

    $.post("api/sendSmsToSalesPerson", { name: $scope.lead.name, number: $scope.lead.number, address: $scope.address,
      represantativeName: $scope.Username, represantativeNumber: $scope.Number, 
      remarks: $scope.remarks, demoDate: $scope.demoDate, businessType: $scope.businessType }, function(res) {
        $timeout(function() {
          $location.path("/leadAction");
        }, 2000);
    });

    // $.post("api/sendSmsToLeadCustomer", { name: $scope.lead.name, number: $scope.lead.number, address: $scope.address,
    //   represantativeName: $scope.represantativeName, represantativeNumber: $scope.represantativeNumber, 
    //   demoDate: $scope.demoDate }, function(res) {
    //   console.log(res);
    // });

    $.post("api/deleteLeadFromLeads", { _id: $scope.lead._id }, function(res) {
      $timeout(function() {
        $location.path("/leadAction");
      }, 2000);
    });

  };

}]);

app.controller("leadCallbackFormController", ["$scope", "$stateParams", "leadUpload", "$timeout", "$location",
  function($scope, $stateParams, leadUpload, $timeout, $location) {

    leadUpload.getForwardLeadById($stateParams.id).then(function(response) {
      $scope.forwardLeadId = response.data.forwardLead._id;
      $scope.forwardLeadName = response.data.forwardLead.name;
      $scope.forwardLeadNumber = response.data.forwardLead.number;
      $scope.forwardLeadAddress = response.data.forwardLead.address;
      $scope.forwardLeadRepresentativeName = response.data.forwardLead.represantativeName;
      $scope.forwardLeadRepresentativeNumber = response.data.forwardLead.represantativeNumber;
      $scope.forwardLeadRemarks = response.data.forwardLead.remarks;
      // $scope.forwardLeadDemoDate = response.data.forwardLead.demoDate;
      $scope.forwardLeadTrade = response.data.forwardLead.trade;
      $scope.forwardLeadBusinessType = response.data.forwardLead.businessType;
    });

  $scope.disposition = {
    model: null,
    availableOptions: [
      { name: "select" },
      { name: "not yet" },
      { name: "reject" }
    ]
  };

  $scope.trade = {
    model: null,
    availableOptions: [
       { name: "pharma retail" },
       { name: "pharma wholesale" },
       { name: "fmcg retail" },
       { name: "fmcg wholesale" },
       { name: "jewellery" },
       { name: "readymade garments" }
    ]
  };

  $scope.callbackLead = function() {

    if ($scope.disposition.model == "select") {

      $.post("api/callbackLeads", { _id: $scope.forwardLeadId, name: $scope.forwardLeadName,
       number: $scope.forwardLeadNumber, address: $scope.forwardLeadAddress, 
       represantativeName: $scope.forwardLeadRepresentativeName, represantativeNumber: $scope.forwardLeadRepresentativeNumber,
       trade: $scope.trade.model, businessType: $scope.forwardLeadBusinessType },
        function(res) {
          $scope.message = 'Lead Is Successfully Forwarded';
          $timeout(function() {
            $location.path("/");
          }, 2000);
      });

      $.post("api/deleteLeadFromCallback", { _id: $scope.forwardLeadId }, function(res) {
        $timeout(function() {
          $scope.message = 'Lead Is Successfully Forwarded';
          $location.path("/");
        }, 2000);
      });

    } else if ($scope.disposition.model == "not yet") {

      $.post("api/updateCallbackLeads", { _id: $scope.forwardLeadId, name: $scope.forwardLeadName, number: $scope.forwardLeadNumber, address: $scope.forwardLeadAddress, represantativeName: $scope.forwardLeadRepresentativeName, 
        represantativeNumber: $scope.forwardLeadRepresentativeNumber, trade: $scope.trade.model, 
        businessType: $scope.forwardLeadBusinessType, remarks: $scope.forwardLeadRemarks, 
        demoDate: $scope.demoDate }, function(res) {
          $scope.message = 'Your Form is successfully Updated, Please wait while Redirecting...';
          $timeout(function() {
            $location.path("/");
          }, 2000);
      });

      $.post("api/sendSmsToSalesPerson", { name: $scope.forwardLeadName, number: $scope.forwardLeadNumber, 
        address: $scope.forwardLeadAddress, represantativeName: $scope.forwardLeadRepresentativeName, 
        represantativeNumber: $scope.forwardLeadRepresentativeNumber, businessType: $scope.forwardLeadBusinessType, 
        remarks: $scope.forwardLeadRemarks, demoDate: $scope.demoDate },
        function(res) {
          $scope.message = 'Your Form is successfully Updated, Please wait while Redirecting...';
          $timeout(function() {
            $location.path("/");
          }, 2000);
      });

    } else if ($scope.disposition.model == "reject") {
      $.post("api/deleteLeadFromCallback", { _id: $scope.forwardLeadId }, function(res) {
        $timeout(function() {
          $scope.message = 'Lead is successfully removed, Please wait while Redirecting...';
          $location.path("/");
        }, 2000);
      });
    } else {
      $scope.warning = "No Update Applied, Please select Dispositions";
    }

  };


}]);

app.controller("MarketingFormController", ["$scope", "marketingUpload", function($scope, marketingUpload) {

  $scope.trade = {
    model: null,
    availableOptions: [
       { name: "pharma retail" },
       { name: "pharma wholesale" },
       { name: "fmcg retail" },
       { name: "fmcg wholesale" },
       { name: "jewellery" },
       { name: "readymade garments" }
    ]
  };

}]);

app.controller("billFormatController", ["$scope", "billformatUpload", "Otp", function($scope, billformatUpload, Otp) {

  function getFormatUploads() {
    billformatUpload.getFormatUploads().then(function(response) {
      if (response.data.success) {
        $scope.billFormats = response.data.billFormat;
      } else {
        $scope.msg = response.data.message;
      }
    });
  }
  getFormatUploads();

}]);

app.controller("formatDetail", ["$scope", "billformatUpload", "Otp", "$timeout", "$stateParams", "$window",
 "$http", function($scope, billformatUpload, Otp, $timeout, $stateParams, $window, $http) {

  billformatUpload.getFormatById($stateParams.formatId).then(function(response) {
    if (response.data.success) {
      $scope.billformat = response.data.results.format;
      $scope.formatname = response.data.results.formatname;
      $scope.name = response.data.results.name;
      $scope.image = response.data.results.image;
      console.log($scope.formatname);
    } else {
      $scope.message = response.data.message;
    }
  });

  $scope.createOtp = function() {

    var otp = Math.random();
    otp = otp * 1000000;
    otp = parseInt(otp);
    // console.log(otp);

    $.post("api/otp", { user: $scope.Id, otp: otp }, function(response) {
      if (response.success) {
         $timeout(function() {
          $scope.otpMessage = "OTP has been sent successfully";
          window.location.reload(true);
        }, 2000);
      } else {
        $scope.errorMsg = "Otp did not match";
      }
    });

    // $.post("api/sendOtpToAdmin", { otp: otp }, function(response) {
    //   console.log(response);
    // });

  }

  Otp.getOtp().then(function(response) {
    $scope.codes = response.data.otps;
  });

  $scope.otpCheck = function(response) {
    var OTP;
    var id;
    angular.forEach($scope.codes, function(code) {
      OTP = code.otp;
      id = code._id;

      if ($scope.otp == OTP) {
        $scope.Message = "OTP verified";
        $.post('api/downloadFormat', { billFormat: $scope.billformat }, function(response) {
          var file = new Blob([response], { type: 'application/dbf' });
          saveAs(file, $scope.formatname);
        });
        $.post('api/deleteOtp', { id: id }, function(req, res) {
          console.log(res);
          window.location.reload(true);
        });
      } else {
        $scope.errorMsg = 'OTP not matched';
      }

    });
    return OTP, id;
  }

}]);

app.controller("editUserCtrl", ["$scope", "$stateParams", "Login", "$timeout", function($scope, $stateParams, Login, $timeout) {

  //users section

  Login.getUser().then(function (response) {
    $scope.Username = response.data.user.username;
    $scope.Name = response.data.user.name;
    $scope.Email = response.data.user.email;
    $scope.Number = response.data.user.number;
    $scope.Id = response.data.user._id;
  });

  $scope.usernameTab = "active";
  $scope.phase1 = true;

  $scope.usernamePhase = function() {
    $scope.usernameTab = "active";
    $scope.nameTab = "default";
    $scope.emailTab = "default";
    $scope.passwordTab = "default";
    $scope.numberTab = "default";
    $scope.phase1 = true;
    $scope.phase2 = false;
    $scope.phase3 = false;
    $scope.phase4 = false;
    $scope.phase5 = false;
  };

  $scope.namePhase = function() {
    $scope.usernameTab = "default";
    $scope.nameTab = "active";
    $scope.emailTab = "default";
    $scope.passwordTab = "default";
    $scope.numberTab = "default";
    $scope.phase1 = false;
    $scope.phase2 = true;
    $scope.phase3 = false;
    $scope.phase4 = false;
    $scope.phase5 = false;
  };

  $scope.emailPhase = function() {
    $scope.usernameTab = "default";
    $scope.nameTab = "default";
    $scope.emailTab = "active";
    $scope.passwordTab = "default";
    $scope.numberTab = "default";
    $scope.phase1 = false;
    $scope.phase2 = false;
    $scope.phase3 = true;
    $scope.phase4 = false;
    $scope.phase5 = false;
  };

  $scope.passwordPhase = function() {
    $scope.usernameTab = "default";
    $scope.nameTab = "default";
    $scope.emailTab = "default";
    $scope.passwordTab = "active";
    $scope.numberTab = "default";
    $scope.phase1 = false;
    $scope.phase2 = false;
    $scope.phase3 = false;
    $scope.phase4 = true;
    $scope.phase5 = false;
  };

  $scope.numberPhase = function() {
    $scope.usernameTab = "default";
    $scope.nameTab = "default";
    $scope.emailTab = "default";
    $scope.passwordTab = "default";
    $scope.numberTab = "active";
    $scope.phase1 = false;
    $scope.phase2 = false;
    $scope.phase3 = false;
    $scope.phase4 = false;
    $scope.phase5 = true;
  };

  $scope.updateUserProfile = function(valid) {
    $scope.disabled = true;
    $scope.errorMsg = false;

    if (valid) {
      $.post("api/editUser", { id: $scope.Id, newUsername: $scope.Username, newName: $scope.Name, 
        newEmail: $scope.Email, newNumber: $scope.Number }, function(response) {
          console.log(response);
      });
    } else {
      $scope.disabled = false;
      $scope.loading = false;
      $scope.errorMsg = 'Please ensure form is filled out properly';
    }
  }

}]);