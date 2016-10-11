/**
 * Created by raul on 9/5/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .controller('DashboardCtrl', DashboardCtrl);

    DashboardCtrl.$inject = ['$scope'];
    function DashboardCtrl($scope) {
        var piechart = c3.generate({
            bindto: '#pie-chart1',
            data: {
                columns: [
                    ['remaining', 30],
                    ['done', 70]
                ],
                type: 'pie',
                colors:{
                    'done': '#054A29'
                }
            }
        });
        $scope.notifications = [
            'Placeat pitchfork irure bespoke, truffaut snackwave health goth.',
            'Chillwave nesciunt aliqua flannel pabst. Gentrify heirloom dolor, anim ullamco organic sint post-ironic butcher fap in. ',
            'Austin +1 fashion axe, sustainable chartreuse elit et cupidatat nostrud. Migas pabst meggings biodiesel in, aliqua literally. 8-bit occaecat tempor.',
            'Enamel pin church-key laboris meh eu coloring book tote bag, forage bitters. Velit dolor 8-bit crucifix, next level knausgaard shoreditch readymade accusamus keffiyeh mollit.',
            'In master cleanse fashion axe, commodo ad cold-pressed enamel pin kogi. Umami beard freegan hashtag.'
        ];
    }
})();