(function(){

  var app = angular.module('group', []);
  var coreURL = 'http://localhost:8080';

  app.controller('GroupController', function($scope, $http){
    $scope.name = "students";
		$scope.data = [];
    $scope.filteredData = $scope.data;

    $scope.pageSize = 10;
    $scope.currentPage = 0;
    $scope.searchQuery = "";

    $scope.pageCount = function(){
      return Math.ceil($scope.filteredData.length / $scope.pageSize);
    };
    $scope.pageNext = function(){
      $scope.currentPage++;
    }
    $scope.pagePrevious = function(){
      $scope.currentPage--;
    }

    $scope.init = function(name){
      $scope.name = name;
      $scope.list();
    }

    $scope.list = function(){
      $http.get(coreURL + '/'+$scope.name+'/list')
        .success(function(data) {
          $scope.data = data;
        }
      );
    }

    $scope.create = function(firstName, lastName){
      if(firstName == undefined || firstName == "")
        return;
      if(lastName == undefined || lastName == "")
        return;
      var request = $http(
      {
        url : coreURL + '/'+$scope.name+'/create',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "firstName="+firstName + "&lastName=" + lastName
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.data = data;
      });
    }

    $scope.delete = function(id){
      var request = $http(
      {
        url : coreURL + '/'+$scope.name+'/remove',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "teacherId="+id
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.data = data;
      });
    }

    //satisfy the auto focus on modal open
    $('#createModal').on('shown.bs.modal', function () {
      $('#inputForm').focus();
    });

  });


  //start from app filter

  app.filter('startFrom', function() {
    return function(input, start) {
        if(input == undefined)
          return input;

        start = +start; //parse to int
        return input.slice(start);
    }
  });



})();
