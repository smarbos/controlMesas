angular.module('starter.controllers', [])
.service('MesasService', function($q) {
  return {
    mesas: [
      {
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
      }
    ],
    getMesas: function() {
      return this.mesas
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
.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};



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



.controller('MesasCtrl', function($scope, mesas) {
  $scope.mesas = mesas;
})

.controller('MesaCtrl', function($scope, MesasService, $location) {
  var mesaId = $location.path().split("/")[3]||"Unknown";
  $scope.mesa = MesasService.getMesa(mesaId-1)
  console.log($scope.mesa);
});
