/**
 * Created by raul on 8/31/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .directive('navbar', navbar);

    navbar.$inject = [];
    function navbar(){
        var directive = {
            restrict: 'E',
            templateUrl: 'views/templates/navbar.html'
        };

        return directive;
    }
})();