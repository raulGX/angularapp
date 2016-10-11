/**
 * Created by raul on 9/1/2016.
 */
(function () {
    'use strict';
    angular.module('psMenu')
        .controller('psMenuController', psMenuController);

    psMenuController.$inject = ['$scope', '$rootScope', '$location'];
    function psMenuController($scope, $rootScope, $location) {
        $scope.showMenu = false;

        this.setActiveElement = function (el) {
            $scope.activeElement = el;
        };

        this.getActiveElement = function () {
            return $scope.activeElement;
        };

        this.setRoute = function (route) {
            $rootScope.$broadcast('ps-menu-item-selected-event', {route:route});
        };

        this.getRoute = function(){
            return $location.path();
        };
        $scope.$on('ps-menu-show', function (evt, data) {
            $scope.showMenu = data.show;
        });
    }
})();