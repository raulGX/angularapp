/**
 * Created by raul on 9/8/2016.
 */
(function () {
    angular.module('myApp')
        .controller('StatisticsCtrl', Statistics);

    Statistics.$inject = ['$scope', 'statistics', 'alerting', '$timeout'];
    function Statistics($scope, statisctics, alerting, $timeout){
        var resultinios;
        statisctics.getResults(0 , function (response) {
            resultinios = response;
            parseResults(resultinios);
            drawChart(resultinios);
        });

        //$scope.drivers = statisctics.getBestDrivers();
        $scope.months =['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        var chart;



        $scope.refresh = function () {
            var currentMoth = statisctics.getMonthNumber($scope.displayStatistics);
            console.log(currentMoth);
            statisctics.getResults(currentMoth + 1, function (results2) {
                parseResults(results2);
                chart.unload();
                drawChart(results2);
            });
        };
        function parseResults(results){
            results.drivers.unshift('Clients');
            results.hours.unshift('drivers');
            results.money.unshift('Money Made');
        }
        function drawChart(results){
            chart = c3.generate({
                bindto: '#chart1',
                data: {
                    x:'drivers',
                    columns: [
                        results.drivers,
                        results.hours,
                        results.money
                    ],
                    axes: {
                        "Money Made": 'y2'
                    },
                    types: {
                        Clients: 'bar'
                    },
                    colors: {
                        "Money Made": '#054A29'
                    }
                },
                axis: {
                    y: {
                        label: {
                            text: 'Clients',
                            position: 'outer-middle'
                        }
                    },
                    x:{
                        label: {
                            text: 'Hour',
                            position: 'outer-middle'
                        }
                    },
                    y2: {
                        show: true,
                        label: {
                            text: 'Money Made',
                            position: 'outer-middle'
                        },
                        tick: {
                            format: d3.format("$,") // ADD
                        }
                    }
                }
            });

        }

        function reDraw(results2){
            chart.reload({
                columns: [
                    results2.drivers,
                    results2.hours,
                    results2.money
                ]
            });
        }
    }
})();