angular
    .module('core.user')
    .factory('UserService', UserService);

function UserService() {
    var setUser = function(user_data) {
        window.localStorage.starter_google_user = JSON.stringify(user_data);
    };

    var login = function(){
      window.localStorage.loggedIn = true;
    };
    var isLoggedIn = function(){
      return window.localStorage.loggedIn;
    };
    var logout = function(){
      window.localStorage.loggedIn = false;
    };
    var getUser = function(){
        return JSON.parse(window.localStorage.starter_google_user || '{}');
    };

    return {
        getUser: getUser,
        isLoggedIn: isLoggedIn,
        logout: logout,
        login: login,
        setUser: setUser
    };
}
