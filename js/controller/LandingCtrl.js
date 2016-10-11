/**
 * Created by raul on 9/2/2016.
 */
(function () {
    'use strict';
    angular
        .module('myApp')
        .controller('LandingCtrl', LandingCtrl);

    LandingCtrl.$inject = ['$scope', '$location'];

    function LandingCtrl($scope, $location){
        $scope.isRestricted = function () {
            var location = $location.path();
            if (location == '/login' || location == '/register')
                return false;
            else
                return true;
        };

        $scope.isLogin = function () {
            if ($location.path() === '/login'){
                return true;
            }
            else
                return false;
        };

        $scope.$on('ps-menu-show-main', function (evt, data) {
            $scope.showMenu = !data.show;
        });
    }
})();