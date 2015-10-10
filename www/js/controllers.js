angular.module('starter.controllers', [])
.service('MesasService', function($q) {
  return {
    mesas: [
      /*{
        id: '1',
        nMesa: 1,
        nPax: 6
      },
      {
        id: '2',
        nMesa: 2,
        nPax: 4
      },
      {
        id: '3',
        nMesa: 3,
        nPax: 2
      }*/
    ],
    getMesas: function() {
      return this.mesas
    },
    addMesa: function(nMesa, nPax){
        var nMesa = nMesa;
        var nPax = nPax;
        var currentTime = new Date;
        console.log(currentTime);
        nuevaMesa = {
            nMesa: nMesa,
            nPax: nPax,
            currentTime: currentTime
        }
        console.log(nuevaMesa);
        this.mesas.push(nuevaMesa);
    },
    getMesa: function(mesaId) {
      var dfd = $q.defer()
      this.mesas.forEach(function(mesa) {
        if (mesa.id === mesaId) dfd.resolve(mesa)
      })

      return this.mesas[mesaId]
    }

  }
})

.controller('AppCtrl', function($scope, $ionicModal, $timeout, MesasService) {

  // Form data for the login modal
  $scope.loginData = {};
  $scope.createTableData = {};


  var menu = {
      "entradas": [
          {"nombre":"borek", "precio":99},
          {"nombre":"borek2", "precio":99},
          {"nombre":"borek3", "precio":99}
      ],
      "principales": [
          {"nombre":"pasha", "precio":199},
          {"nombre":"pasha2", "precio":199},
          {"nombre":"pasha3", "precio":199}
      ],
      "postres": [
          {"nombre":"baklava", "precio":59},
          {"nombre":"kadaif", "precio":59},
          {"nombre":"mamul", "precio":59}
      ]
  };

  $scope.groups = [];
  for (var i=0; i<10; i++) {
    $scope.groups[i] = {
      name: i,
      items: [],
      show: false
    };
    for (var j=0; j<3; j++) {
      $scope.groups[i].items.push(i + '-' + j);
    }
  }

  /*
   * if given group is the selected group, deselect it
   * else, select the given group
   */
  $scope.toggleGroup = function(group) {
    group.show = !group.show;
  };
  $scope.isGroupShown = function(group) {
    return group.show;
  };



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
      MesasService.addMesa($scope.createTableData.number,$scope.createTableData.pax);
      $scope.addTableModal.hide();
    }


  var menu = [
    {
    'entradas': {
      'id': 1,
      'nombre': "Borek",
      'precio': 67
    }
    },
    {
    'principales': {
      'id': 1,
      'nombre': "Pasha Borek",
      'precio': 120
    }
  },{
    'postres': {
      'id': 1,
      'nombre': "Baklava",
      'precio': 98
    }

  }];
  console.log(menu);
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



.controller('MesasCtrl', function($scope, $ionicModal, MesasService) {
  $scope.mesas = MesasService.getMesas();
})

.controller('MesaCtrl', function($scope, MesasService, $location) {
  var mesaId = $location.path().split("/")[3]||"Unknown";
  $scope.mesa = MesasService.getMesa(mesaId-1)
  console.log($scope.mesa);



});
