/**
 * Created by raul on 8/30/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .directive('alerts', alertingDirective);

    alertingDirective.$inject = ['alerting'];
    function alertingDirective(alerting) {
        var directive = {
            restrict: 'EA',
            templateUrl: 'views/templates/alerting.html',
            scope: true,
            controller: myController,
            link: link
        };

        return directive;

        function myController($scope) {
            $scope.removeAlert = function(alert){
                alerting.removeAlert(alert);
            }
        }

        function link(scope){
            scope.currentAlerts = alerting.currentAlerts;
        }
    }
})();