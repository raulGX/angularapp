/**
 * Created by raul on 9/8/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .factory('statistics', statistics);

    statistics.$inject = ['BookingRequest'];
    function statistics(BookingRequest) {
        var results = {
            count: 0,
            drivers: [],
            hours: [],
            money: []
        };

        var service = {};

        service.getResults = getResults;
        service.getBestDrivers = getBestDrivers;
        service.monthsPassedThisYear = monthsPassedThisYear;
        service.getMonthNumber = dateIndex;

        return service;

        function parseMyInfo(resultinios) {
            var parsedInfo = {
                hours: {},
                money: {}
            };

            resultinios.forEach(function (item) {
                parseBooking(item);
            });

            angular.forEach(parsedInfo.hours, function (item, key) {
                results.drivers.push(item);
                results.hours.push(+key);
            });
            angular.forEach(parsedInfo.money, function (item) {
                results.money.push(+item.toFixed(2));
            });
            results.count = results.money.length + 1;

            function parseBooking(booking){

                var currentDate = booking.booking_pickup_time;
                currentDate = new Date(currentDate);
                var currentHour = currentDate.getHours();

                if (parsedInfo.hours[currentHour])
                    parsedInfo.hours[currentHour]++;
                else
                    parsedInfo.hours[currentHour] = 1;

                var theMoney = +booking.booking_price;
                if(parsedInfo.money[currentHour])
                    parsedInfo.money[currentHour] += theMoney;
                else
                    parsedInfo.money[currentHour] = theMoney;
            }
        }

        function getResults(query, callback) {
            results = {
                count: 0,
                drivers: [],
                hours: [],
                money: []
            };
            var allBookings = 1000;
            BookingRequest.GetBookings(1, allBookings, function (resultinios) {
                resultinios = resultinios.data.data;

                if (query) {
                    query--; // january is month 1 before loop
                    resultinios = resultinios.filter(function (item) {
                        return new Date(item.booking_pickup_time).getMonth() == query;
                    });
                }
                parseMyInfo(resultinios);
                callback(results);
            });

        }

        function calculateResults(query) {
           //  var resultinios1 = [];
           //
           //  var drivers = ['Bossel Boss', 'Base', 'Miron', 'Gicu', 'Argentin', 'Alex', 'Gheo', 'Serban', 'Bunicu', 'Bossel Boss'];
           //
           //  var id = 1;
           //  for (var i = 0; i < 300; i++){
           //      var date = new Date();
           //      date.setHours((date.getHours() + Math.random() * 100000 - 50000)); //%24
           //      var theBooking = {
           //          id: 1,
           //          driver: drivers[parseInt(Math.random() * drivers.length)],
           //          pickupTime: date.toLocaleString(),
           //          pickupAddress: 'Iashington 20',
           //          dropoffAddress: 'Vaslui 420',
           //          car: 'BMV',
           //          client: 'Stanislav',
           //          payment: 'Cash Always',
           //          price: +(Math.random() * 100 + 20).toFixed(2)
           //      };
           //      theBooking.id = id++;
           //      resultinios1.push(theBooking);
           //  }
           //  if (query){
           //      query--; // january is month 1 before loop
           //      resultinios1 = resultinios1.filter(function(item){
           //         return new Date(item.pickupTime).getMonth() == query;
           //      });
           //  }
           //  console.log('exited loop' + resultinios1.length);
           //
           // return resultinios1;
            
        }
        function getBestDrivers(){
           
        }

        function monthsPassedThisYear(){
            var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            var currentMonth = new Date().getMonth();

            return monthArray.slice(0, currentMonth + 1);
        }

        function dateIndex(month){
            var monthArray = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            return monthArray.indexOf(month);
        }
    }
})();