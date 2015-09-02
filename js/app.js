angular.module('groupapp').controller('GenericNavigationController', function ($scope, $parse) {

  $scope.navigation.searchQuery = "";

  actual = "data.filteredTeachers";
  currentPage = 0;

  $scope.init = function(d){
    actual = d;
  }

  $scope.navigation.currentPage = function(){
    if(currentPage > $scope.navigation.totalPages() - 1)
      currentPage = $scope.navigation.totalPages() - 1;
    return currentPage+1;
  };

  $scope.navigation.totalPages = function(){
    // < 0 ? wtf
    if($scope.navigation.getLength() <= 0)
      return 1;
    return Math.ceil($scope.navigation.getLength() / 10);
  };
  $scope.navigation.hasNext = function(){
    return currentPage < $scope.navigation.totalPages() - 1;
  };
  $scope.navigation.hasPrevious = function(){
    return currentPage > 0;
  };
  $scope.navigation.next = function(){
    if($scope.navigation.hasNext())
      currentPage ++;
  };
  $scope.navigation.previous = function(){
    if($scope.navigation.hasPrevious())
      currentPage--;
  };
  $scope.navigation.getLength = function(){
    var v = $parse(actual);
    return v($scope).length;
  }
});
