angular.module('starter.controllers')
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
