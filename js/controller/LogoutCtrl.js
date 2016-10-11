/**
 * Created by raul on 9/6/2016.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('LogoutCtrl', LogoutCtrl);

    LogoutCtrl.$inject = ['AuthenticationService', '$location', '$scope'];
    function LogoutCtrl(AuthenticationService, $location, $scope) {
        var logout = function () {
            AuthenticationService.ClearCredentials();
            $location.path('/login');
        };
        logout();
    }
})();