//CREATE MODALS

angular.module('groupapp').controller('GenericModalController', function($scope, $modalInstance, data, argument){
  $scope.data = data;
  $scope.argument = argument;

  $scope.close = function(){
    $modalInstance.close();
  }
});
