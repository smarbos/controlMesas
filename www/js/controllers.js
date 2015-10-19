angular.module('starter.controllers', [])
.service('TablesService', function($q, $localStorage) {
  return {
    mesas: [],
    getTables: function() {
      return this.mesas;
    },
    addTable: function(tableNumber, pax){
        var id = this.mesas.length + 1;
        var tableNumber = tableNumber;
        var pax = pax;
        var nuevaMesa = {
            id: id,
            tableNumber: tableNumber,
            pax: pax,
            startedAt: new Date,
            status: 'open',
            selected: false,
            products : []
        };
        console.log(nuevaMesa);
        this.mesas.push(nuevaMesa);
    },
    getTable: function(mesaId) {
      return this.mesas[mesaId];
    },
    setCurrentTable: function(mesaId) {
        _.each(this.mesas, function(mesa) { mesa.selected = false; });
        console.log('Current table is now: #' + mesaId);
        this.mesas[mesaId-1].selected = true;
    },
    getCurrentTable: function() {
    return _.findWhere(this.mesas, { selected: true});

    }
  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, TablesService, $localStorage) {

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

  $scope.addToTable = function(product)
  {
    var targetTable =  TablesService.getCurrentTable();
    if( _.findWhere(targetTable.products, product) === undefined )
    {
        _.extend(product, { qty: 1});
        targetTable.products.push(product);
        console.log('Added ' + product.name + ' to table ' + targetTable.tableNumber )
    }
    else
    {
        _.findWhere(targetTable.products, product).qty = _.findWhere(targetTable.products, product).qty + 1
        console.log('Updated ' + product.name + ' to ' + _.findWhere(targetTable.products, product).qty )
    }
  }

  $scope.menu = [
          {"section": "starter", "productId": 1, "name":"Hamus", "price":99},
          {"section": "starter", "productId": 2, "name":"Babaganush", "price":99},
          {"section": "starter", "productId": 3, "name":"Sarma", "price":99},
          {"section": "main", "productId": 4, "name":"Mousaka", "price":199},
          {"section": "main", "productId": 5, "name":"Pasha Borek", "price":199},
          {"section": "main", "productId": 6, "name":"Manti", "price":199}
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
  TablesService.setCurrentTable(mesaId);
  $scope.mesa = TablesService.getTable(mesaId-1)
  $scope.changeStatus = function(tableId, newStatus){
    $scope.mesas = TablesService.getTables();
    var match = _.find($scope.mesas, function(table) { return table.id === tableId })
    if (match) {
        match.status = newStatus;
    }
  }



});
