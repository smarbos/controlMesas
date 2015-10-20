angular.module('starter.controllers')
.controller('MesasCtrl', function($scope, $ionicModal, TablesService) {
  $scope.mesas = TablesService.getTables();
});
