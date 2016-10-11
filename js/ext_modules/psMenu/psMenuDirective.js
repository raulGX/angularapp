/**
 * Created by raul on 9/1/2016.
 */
(function () {
    'use strict';
    angular.module('psMenu')
        .directive('psMenu', psMenu);

    psMenu.$inject = [];
    function psMenu() {
        var directive = {
            restrict: 'AE',
            transclude: true,
            scope:{

            },
            templateUrl: 'js/ext_modules/psMenu/psMenuTemplate.html',
            controller: 'psMenuController',
            link: link
        };

        return directive;

        function link(scope, element, attribute, ctrl) {

        }
    }
})();