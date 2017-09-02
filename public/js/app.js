var app = angular.module('myApp', ['ngRoute']);

app.config(function($routeProvider, $httpProvider, $locationProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/Form.html',
        controller: 'MainCtrl'
      }).
      when('/list', {
        templateUrl: 'partials/List.html',
        controller: 'ListCtrl'
      });

      $locationProvider.html5Mode(true);

  });


app.controller('MainCtrl',  function($scope, $http)
{
  $scope.formInfo = {};
  $scope.submitted  = true;
  $scope.emailFormat = /^[a-z]+[a-z0-9._]+@[a-z]+\.[a-z.]{2,5}$/;

  $scope.saveForm   = function()
  {
      $http({
        method  : 'post',
        url     : '/register',
        data    : {
              form: $scope.formInfo
            }
    })
    .success(function(data)
    {
        if(data.error == 0)
        {
          $scope.msg      =   data.msg;
          $scope.class    =   'alert alert-success';
          $scope.submitted  = false;
          $scope.formInfo = {};
        }
        
    });
  }
});
  
  app.controller('ListCtrl',  function($scope, $http)
  {
      $scope.userList = '';
      $http({
        method  : 'get',
        url     : '/getusers',
        
    })
    .success(function(data)
    {
        if(data.error == 0)
        {
          $scope.userList  = data.users;
        }
        
    });
  
  });
  

















