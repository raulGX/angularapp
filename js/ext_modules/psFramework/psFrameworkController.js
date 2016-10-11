/**
 * Created by raul on 9/1/2016.
 */
(function () {
    'use strict';
    angular.module('psFramework')
        .controller('psFrameworkController', psFrameworkController);
    
    psFrameworkController.$inject = ['$scope', '$window', '$timeout', '$rootScope', '$location', 'AuthenticationService'];
    function psFrameworkController($scope, $window, $timeout, $rootScope, $location, AuthenticationService) {
        $scope.isMenuVisible = false;
        $scope.isMenuButtonVisible = false;

        $scope.$on('ps-menu-item-selected-event', function (event, data) {
            $location.path(data.route);
            checkWidth();
            broadcastMenuState();
        });

        $($window).on('resize.psFramework', function () {
            $scope.$apply(function () {
                checkWidth();
                broadcastMenuState();
            });
        });

        $scope.$on('$destroy', function () {
            $($window).off('resize.psFramework');
        });

        var checkWidth= function() {
            var width = Math.max($($window).width(), $window.innerWidth);
            $scope.isMenuVisible = (width > 768);
            $scope.isMenuButtonVisible = !$scope.isMenuVisible;
        };

        $scope.menuButtonClicked = function () {
            $scope.isMenuVisible = !$scope.isMenuVisible;
            broadcastMenuState();
            // $scope.$apply();
        };

        var broadcastMenuState = function () {
            $rootScope.$broadcast('ps-menu-show',
                {
                    show: $scope.isMenuVisible
                });
            $rootScope.$broadcast('ps-menu-show-main',
                {
                    show: $scope.isMenuVisible
                });
        };

        $scope.logout = function () {
            AuthenticationService.ClearCredentials();
            location.reload();
        };

        $timeout(function () {
            checkWidth();
            broadcastMenuState();
        }, 300);
    }
})();