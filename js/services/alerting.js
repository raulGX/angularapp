/**
 * Created by raul on 8/30/2016.
 */
(function () {
    'use strict';

    angular.module('myApp')
        .factory('alerting', Alerting);

    Alerting.$inject = ['$timeout'];
    function Alerting($timeout) {

        var currentAlerts = [];
        var alertTypes =['success', 'danger', 'info', 'warning'];

        var service = {};

        service.currentAlerts = currentAlerts;
        service.addAlert = addAlert;
        service.addSuccess = addSuccess;
        service.addDanger= addDanger;
        service.addInfo = addInfo;
        service.addWarning = addWarning;
        service.removeAlert = removeAlert;
        
        return service;

        function addAlert(type, message) {
            var myAlert = {type: type, message: message};
            currentAlerts.push(myAlert);

            $timeout(function () {
                removeAlert(myAlert);
            }, 5000);
        }

        function addSuccess(message) {
            addAlert('success', message);
        }

        function addDanger(message) {
            addAlert('danger', message);
        }

        function addInfo(message) {
            addAlert('info', message);
        }

        function addWarning(message) {
            addAlert('warning', message);
        }

        function removeAlert(alert) {
            for (var i = 0; i < currentAlerts.length; i++){
                if (currentAlerts[i] === alert){
                    currentAlerts.splice(i, 1);
                    break;
                }
            }
        }
    }
})();