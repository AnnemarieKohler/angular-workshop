promiseApp.service('UserService', ['$http', function($http) {
  this.fetchLoginWithReturn = function(){
    var login;
    $http.get('http://api.github.com/users').then(function(response){
      $http.get('http://api.github.com/users/' + response.data[0].id).then(function(user){
        login = user.login;
      });
    });

    return login;
  };
  
  this.fetchLoginWithPromise = function(){
   return $http.get('http://api.github.com/users')
     .then(_secondPromise)
     .then(_handleResponse)

   function _secondPromise(response) {
     return $http.get('http://api.github.com/users/' + response.data[0].id)
   }

   function _handleResponse(response){
     var user = response.data;
     return user.login;
   }
 };
}]);
