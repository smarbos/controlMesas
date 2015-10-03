angular.module('starter.controllers', [])
.service('TodosService', function($q) {
  return {
    todos: [
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
    getTodos: function() {
      return this.todos
    },
    getTodo: function(todoId) {
      var dfd = $q.defer()
      this.todos.forEach(function(todo) {
        if (todo.id === todoId) dfd.resolve(todo)
      })

      return dfd.promise
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



.controller('MesasCtrl', function($scope, todos) {
  $scope.mesas = todos;
})

.controller('MesaCtrl', function($scope, todo) {
  $scope.todo = todo;
});
