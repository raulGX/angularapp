/**
 * Created by raul on 9/1/2016.
 */
(function () {
    'use strict';
    angular.module('psMenu')
        .directive('psMenuItem', psMenuItem);

    psMenuItem.$inject = [];
    function psMenuItem() {
        var directive = {
            require: '^psMenu',
            scope: {
                label: '@',
                icon: '@',
                route: '@'
            },
            templateUrl: 'js/ext_modules/psMenu/psMenuItemTemplate.html',
            link: link
        };

        return directive;

        function link(scope, element, attribute, controller) {
            scope.isActive = function () {
                return element === controller.getActiveElement();
            };

            //set active element on refresh
            (function () {
                var currentRoute = attribute.route;
                if (!currentRoute.length)
                    currentRoute = '/';
                if (currentRoute == controller.getRoute()){
                    controller.setActiveElement(element);
                }

            })();

            element.on('click', function (event) {
                event.stopPropagation();
                event.preventDefault();
                scope.$apply(function () {
                    controller.setActiveElement(element);
                    controller.setRoute(scope.route);
                });
            });
        }
    }
})();