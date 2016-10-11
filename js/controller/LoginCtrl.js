/**
 * Created by raul on 8/22/2016.
 */
/**
 * Created by raul on 8/17/2016.
 */
'use strict';

app.controller('LoginCtrl', function ($scope, $http, AuthenticationService, $location) {
    $scope.credentials = {
        email: '',
        password: ''
    };

    $scope.badLogin = {
        show: false,
        message: ''
    };
    $scope.login = function () {
        AuthenticationService.Login($scope.credentials.email, $scope.credentials.password, successLogin, failLogin);

        function successLogin(response) {
            AuthenticationService.SetCredentials($scope.credentials.email, response.data.data.company_id);
            console.log($http.defaults.headers.common);
            $scope.badLogin.show = false;
                $location.path('/');
        }

        function failLogin(response) {
            console.log(response);
            $scope.badLogin.show = true;
            $scope.badLogin.message = response;

        }
    };

});
