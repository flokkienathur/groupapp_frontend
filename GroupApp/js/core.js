var app = angular.module('groupapp', ['ngAnimate','ui.bootstrap']);
var coreURL = 'http://localhost:8080'

app.factory('navigation', function(){
  return {};
});

app.factory('data', function(){
  return {};
});

app.controller('CoreController', function($scope, $http, $modal, navigation, data){
  $scope.navigation = navigation;
  $scope.data = data;

  data.students = [];
  data.teachers = [];
  data.groups = [];

  data.filteredStudents = [];
  data.filteredTeachers = [];
  data.filteredGroups = [];

  //open modal function //maybe refactor this?
  $scope.open = function(url, argument){
    var modalInstance = $modal.open({
      animation: true,
      templateUrl: url,
      controller:'GenericModalController',
      resolve: {
        argument: function(){
          return argument;
        }
      }
    });
  }

  $scope.data.listStudents = function(){
    $http.get(coreURL + '/students/list')
      .success(function(data) {
        $scope.data.students = data;
      }
    );
  }
  $scope.data.listTeachers = function(){
    $http.get(coreURL + '/teachers/list')
      .success(function(data) {
        $scope.data.teachers = data;
      }
    );
  }
  $scope.data.listGroups = function(){
    $http.get(coreURL + '/groups/list')
      .success(function(data) {
        $scope.data.groups = data;
      }
    );
  }

  //CREATES

  $scope.data.createStudent = function(firstName, lastName){
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
      $scope.data.students = data;
    });
  }

  $scope.data.createTeacher = function(firstName, lastName){
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
      $scope.data.teachers = data;
    });
  }

  $scope.data.createGroup = function(name){
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
      $scope.data.groups = data;
    });
  }

  //UPDATES
  $scope.data.updateStudent = function(id, firstName, lastName){
    if(firstName == undefined || firstName == "")
      return;
    if(lastName == undefined || lastName == "")
      return;
    var request = $http(
    {
      url : coreURL + '/students/update',
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "firstName="+firstName + "&lastName=" + lastName + "&studentId=" + id
    });

    request.error(function(data){
      console.log(data);
    });

    request.success(function(data){
      $scope.data.students = data;
    });
  }
  $scope.data.updateTeacher = function(id, firstName, lastName){
    if(firstName == undefined || firstName == "")
      return;
    if(lastName == undefined || lastName == "")
      return;
    var request = $http(
    {
      url : coreURL + '/teachers/update',
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "firstName="+firstName + "&lastName=" + lastName + "&teacherId=" + id
    });

    request.error(function(data){
      console.log(data);
    });

    request.success(function(data){
      $scope.data.teachers = data;
    });
  }
  $scope.data.updateGroup = function(id, name){
    if(name == undefined || name == "")
      return;
    var request = $http(
    {
      url : coreURL + '/groups/update',
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      data: "name="+name + "&groupId=" + id
    });

    request.error(function(data){
      console.log(data);
    });

    request.success(function(data){
      $scope.data.groups = data;
    });
  }

  //DELETES

  $scope.data.deleteStudent = function(id){
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
      $scope.data.students = data;
    });
  }

  $scope.data.deleteTeacher = function(id){
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
      $scope.data.teachers = data;
    });
  }

  $scope.data.deleteGroup = function(id){
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
      $scope.data.groups = data;
    });
  }

  $scope.data.groupAddStudent = function(groupId, studentId, update){
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
      $scope.data.groups = data;
      if(update != undefined){
        $scope.data.listStudents();
      }
    });
  }

  $scope.data.groupRemoveStudent = function(groupId, studentId, update){
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
      $scope.data.groups = data;
      if(update != undefined){
        $scope.data.listStudents();
      }
    });
  }

  $scope.data.groupSetTeacher = function(groupId, teacherId, update){
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
      $scope.data.groups = data;
      if(update != undefined){
        $scope.data.listTeachers();
      }
    });
  }
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
