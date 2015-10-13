angular.module('starter.controllers', [])
.service('TablesService', function($q) {
  return {
    mesas: [],
    getTables: function() {
      return this.mesas
    },
    addTable: function(tableNumber, pax){
        var tableNumber = tableNumber;
        var pax = pax;
        nuevaMesa = {
            tableNumber: tableNumber,
            pax: pax,
            startedAt: new Date,
            status: 'open'
        }
        console.log(nuevaMesa);
        this.mesas.push(nuevaMesa);
    },
    getTable: function(mesaId) {
      var dfd = $q.defer()
      this.mesas.forEach(function(mesa) {
        if (mesa.id === mesaId) dfd.resolve(mesa)
      })

      return this.mesas[mesaId]
    }

  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, TablesService) {

  // Form data for the login modal
  $scope.loginData = {};
  $scope.createTableData = {};

  $scope.allTables = ['1','2','3','4','4B','5','6','7','8','9'];
  console.log(  $scope.allTables);
  $scope.activeMenu = function(section){
    if ($scope.isSectionActive(section)) {
      $scope.activeSection = null;
    } else {
      $scope.activeSection = section;
    }
    console.log('activate menu '+ $scope.activeSection)
  };

  $scope.isSectionActive = function(section) {
    return $scope.activeSection === section;
  };

  $scope.addToTable = function(menuItem){
    console.log('Added ' + menuItem + ' to menu.')
  }

  $scope.menu = [
          {"section": "starter", "name":"Hamus", "price":99},
          {"section": "starter", "name":"Babaganush", "price":99},
          {"section": "starter", "name":"Sarma", "price":99},
          {"section": "main", "name":"Mousaka", "price":199},
          {"section": "main", "name":"Pasha Borek", "price":199},
          {"section": "main", "name":"Manti", "price":199}
        ];
console.log($scope.menu);

  $scope.menuSections = [{
    name:'starter'
  },
  {
    name:'main'
  },
  {
    name:'dessert'
  }];




    // ADD TABLE
    $ionicModal.fromTemplateUrl('templates/addTable.html', {
      scope: $scope
  }).then(function(addTableModal) {
      $scope.addTableModal = addTableModal;
    });

    // Triggered in the login modal to close it
    $scope.closeAddTable = function() {
      $scope.addTableModal.hide();
    };

    // Open the login modal
    $scope.addTable = function() {
      $scope.addTableModal.show();
    };

    $scope.createTable = function() {
      //   console.log($scope.createTableData);
      TablesService.addTable($scope.createTableData.number,$scope.createTableData.pax);
      $scope.addTableModal.hide();
    }

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('AddTable', function($scope, $ionicModal) {

})

.controller('MesasCtrl', function($scope, $ionicModal, TablesService) {
  $scope.mesas = TablesService.getTables();
})

.controller('MesaCtrl', function($scope, TablesService, $location) {
  var mesaId = $location.path().split("/")[3]||"Unknown";
  $scope.mesa = TablesService.getTable(mesaId-1)
  console.log(mesaId);

  $scope.changeStatus = function(tableNumber, newStatus){
    $scope.mesas = TablesService.getTables();
    var match = _.find($scope.mesas, function(table) { return table.tableNumber === tableNumber })
    if (match) {
        match.status = newStatus;
    }
  }



});
