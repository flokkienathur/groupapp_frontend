(function(){

  var app = angular.module('group', []);
  var coreURL = 'http://localhost:8080/BackendGroupApp';

  app.controller('GroupController', function($scope, $http){
		$scope.docenten = [];
    $scope.pageSize = 10;
    $scope.currentPage = 0;
    $scope.searchQuery = "";

    $scope.filteredDocenten = $scope.docenten;

    $scope.pageCount = function(){
      return Math.ceil($scope.filteredDocenten.length / $scope.pageSize);
    };
    $scope.pageNext = function(){
      $scope.currentPage++;
    }
    $scope.pagePrevious = function(){
      $scope.currentPage--;
    }

    $scope.createData = {
      firstName : "",
      lastName : "",
      errorMessage : "",
      create : function(){
        if(this.firstName != "" && this.lastName != ""){
          var request = $http(
          {
            url : coreURL + '/teachers/create',
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            },
            data: "firstName="+this.firstName+"&lastName=" + this.lastName
          });

          request.error(function(data){
            console.log(data);
          });

          request.success(function(data){
            $scope.docenten = data;
          });

          this.firstName = "";
          this.lastName = "";
        }else{
          this.errorMessage = "Please fill in both first and last name!";
        }
      }
    }

    //request the current student list.
    $http.get(coreURL + '/teachers/list')
      .success(function(data) {
        $scope.docenten = data;
      }
    );


  });

  app.filter('startFrom', function() {
    return function(input, start) {
        if(input == undefined)
          return input;

        start = +start; //parse to int
        return input.slice(start);
    }
  });

})();
