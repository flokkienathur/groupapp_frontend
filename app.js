(function(){

  var app = angular.module('group', []);
  var coreURL = 'http://localhost:8080';

  app.controller('GroupController', function($scope, $http){
		$scope.students = [];
  	$scope.teachers = [];
    $scope.groups = [];
    $scope.filteredData = [];

    $scope.pageSize = 10;
    $scope.currentPage = 0;
    $scope.searchQuery = "";

    $scope.selectedGroup = {};
    $scope.currentModal = {};

    $scope.pageCount = function(){
      return Math.ceil($scope.filteredData.length / $scope.pageSize);
    };
    $scope.pageNext = function(){
      $scope.currentPage++;
    }
    $scope.pagePrevious = function(){
      $scope.currentPage--;
    }

    $scope.setSelectedGroup = function(id){
      $scope.selectedGroup = id;
    }

    //LISTS

    $scope.listStudents = function(){
      $http.get(coreURL + '/students/list')
        .success(function(data) {
          $scope.students = data;
        }
      );
    }
    $scope.listTeachers = function(){
      $http.get(coreURL + '/teachers/list')
        .success(function(data) {
          $scope.teachers = data;
        }
      );
    }
    $scope.listGroups = function(){
      $http.get(coreURL + '/groups/list')
        .success(function(data) {
          $scope.groups = data;
        }
      );
    }

    //CREATES

    $scope.createStudent = function(firstName, lastName){
      if(firstName == undefined || firstName == "")
        return;
      if(lastName == undefined || lastName == "")
        return;
      var request = $http(
      {
        url : coreURL + '/students/create',
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
        $scope.students = data;
      });
    }

    $scope.createTeacher = function(firstName, lastName){
      if(firstName == undefined || firstName == "")
        return;
      if(lastName == undefined || lastName == "")
        return;
      var request = $http(
      {
        url : coreURL + '/teachers/create',
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
        $scope.teachers = data;
      });
    }

    $scope.createGroup = function(name){
      if(name == undefined || name == "")
        return;
      var request = $http(
      {
        url : coreURL + '/groups/create',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "name="+name
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.groups = data;
      });
    }

    //DELETES

    $scope.deleteStudent = function(id){
      var request = $http(
      {
        url : coreURL + '/students/remove',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "studentId="+id
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.students = data;
      });
    }

    $scope.deleteTeacher = function(id){
      var request = $http(
      {
        url : coreURL + '/teachers/remove',
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
        $scope.teachers = data;
      });
    }

    $scope.deleteGroup = function(id){
      var request = $http(
      {
        url : coreURL + '/groups/remove',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "groupId="+id
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.groups = data;
      });
    }

    $scope.groupAddStudent = function(groupId, studentId, update){
      var request = $http(
      {
        url : coreURL + '/groups/add_student',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "groupId="+groupId + "&studentId=" + studentId
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.groups = data;
        if(update != undefined){
          $scope.listStudents();
        }
      });
    }

    $scope.groupRemoveStudent = function(groupId, studentId, update){
      var request = $http(
      {
        url : coreURL + '/groups/remove_student',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "groupId="+groupId + "&studentId=" + studentId
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.groups = data;
        if(update != undefined){
          $scope.listStudents();
        }
      });
    }

    $scope.groupSetTeacher = function(groupId, teacherId, update){
      var request = $http(
      {
        url : coreURL + '/groups/set_teacher',
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        data: "groupId="+groupId + "&teacherId=" + teacherId
      });

      request.error(function(data){
        console.log(data);
      });

      request.success(function(data){
        $scope.groups = data;
        if(update != undefined){
          $scope.listTeachers();
        }
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
