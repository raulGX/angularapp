/**
 * Created by raul on 8/30/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .directive('forminput', forminput);


    function forminput() {
        var directive = {
            restrict: 'A',
            link: link
        };

        return directive;

        function setupDom(element) {
            var input = element.querySelector('input');
            var type = input.getAttribute('type');
            if (type !== 'checkbox' && type !== 'radio')
                input.classList.add('form-control');

            var label = element.querySelector('label');
            label.classList.add('control-label');
            element.classList.add('form-group');
        }

        function link(scope, element) {
            setupDom(element[0]);
        }
    }
})();