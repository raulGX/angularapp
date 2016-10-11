/**
 * Created by raul on 9/1/2016.
 */
(function () {
    'use strict';
    angular.module('psFramework')
        .directive('psFramework', psFramework);

    psFramework.$inject = [];

    function psFramework() {
        var directive = {
            transclude: true,
            scope: {
                title: '@',
                subtitle: '@',
                iconFile: '@'
            },
            controller: 'psFrameworkController',
            templateUrl: 'js/ext_modules/psFramework/psFrameworkTemplate.html'
        };

        return directive;
    }
})();