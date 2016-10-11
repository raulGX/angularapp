// booking get quote pentru price si alte lucruri
/**
 * Created by raul on 8/17/2016.
 */
(function(){
    'use strict';
    angular.module('myApp')
        .controller('NewBookingCtrl', NewBookingCtrl);
    function NewBookingCtrl($scope, GoogleLocation, BookingRequest, Car, $http, alerting, Main_Conf, $rootScope, $timeout)  {
        $scope.userInfo = {};

        $scope.radioButtons = []; //array of car objects
        $scope.arrayOfSeats = [];
        $scope.setCarId = setCarId;
        getCarTypes();

        $scope.setCartodriver = function (obj) {
            $scope.cartodriver_id = JSON.parse($scope.etc).cartodriver_id;

        };

        $scope.userInfo.pickupDate = new Date();
        $scope.userInfo.theTime = new Date();
        $scope.createClient = createClient;


        $scope.paymentTypes = [];
        $scope.setPaymentId = setPaymentId;
        getPaymentTypes();

        var pickupInfo = {};    //used in
        var dropOffInfo = {};   //location and price get

        initAutocomplete();

        $scope.price = 0;
        $scope.distance = 0;
        $scope.bookingResults = {};

        $scope.getPrice = getPrice;

        $scope.getDistance = getDistance;

        $scope.getUserBySearch = BookingRequest.GetUsersBySearch;
        $scope.completeUserInfo = completeUserInfo;

        $scope.postBooking = postBooking;
        $scope.RandomBooking = RandomBooking;
        $scope.LotsOfRandoms = LotsOfRandoms;
        //calendar
        $scope.dateOptions = {
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        };
        $scope.popup1 = {};
        $scope.popup1.opened = false;
        $scope.open1 = function() {

            $scope.popup1.opened = true;
        };
        $scope.possibleCars = false;
        $scope.calcCars = getPossibleCars;

        function initAutocomplete(){
            var autocompletePickup, autocompleteDropoff;
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            autocompletePickup = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('pickup')),
                {types: ['geocode'], componentRestrictions: {country: 'ro'}}
            );
            autocompleteDropoff = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('dropoff')),
                {types: ['geocode'], componentRestrictions: {country: 'ro'}}
            );

            autocompletePickup.addListener('place_changed', fillInAddressPickup);
            autocompleteDropoff.addListener('place_changed', fillInAddressDropoff);

            function fillInAddressPickup() {
                $scope.userInfo.pickup = document.getElementById('pickup').value;
                var place = autocompletePickup.getPlace();
                pickupInfo.type = 'p';
                pickupInfo.address = $scope.userInfo.pickup;
                pickupInfo.lat = place.geometry.location.lat();
                pickupInfo.lng = place.geometry.location.lng();
            }
            function fillInAddressDropoff() {
                $scope.userInfo.dropoff = document.getElementById('dropoff').value;
                var place = autocompleteDropoff.getPlace();
                dropOffInfo.type = 'd';
                dropOffInfo.address = $scope.userInfo.dropoff;
                dropOffInfo.lat = place.geometry.location.lat();
                dropOffInfo.lng = place.geometry.location.lng();
            }

        }

        function getDistance() {
            $timeout(function () {
                if ($scope.userInfo.pickup && $scope.userInfo.dropoff){
                    var service = new google.maps.DistanceMatrixService;
                    service.getDistanceMatrix({
                        origins: [document.getElementById('pickup').value],
                        destinations: [document.getElementById('dropoff').value],
                        travelMode: 'DRIVING',
                        unitSystem: google.maps.UnitSystem.METRIC,
                        avoidHighways: false,
                        avoidTolls: false
                    }, function(response, status) {
                        $scope.userInfo.dropoff = document.getElementById('dropoff').value;
                        $scope.userInfo.pickup = document.getElementById('pickup').value;
                        $scope.$apply(function () {
                            $scope.distance = response.rows[0].elements[0].distance.value;
                            $scope.duration = response.rows[0].elements[0].duration.value;
                        });
                        // $scope.buildPriceVar();
                        // $scope.price = 420;
                    });
                }
                else{
                    $scope.distance = 0;
                }
            },100);
        }

        function getPrice() {

            $scope.userInfo.dropoff = document.getElementById('dropoff').value;
            $scope.userInfo.pickup = document.getElementById('pickup').value;
            if ($scope.distance && $scope.userInfo.cartype && $scope.userInfo.payment) {
                var distance = $scope.distance;
                var carName = $scope.userInfo.cartype;
                var multiply = 1;
                if (carName == 'Economic')
                    multiply = 1.2;
                else if (carName == 'Lux')
                    multiply = 2.5;
                $scope.price = (distance * multiply / 1000).toFixed(2);
            }
            else{
                $scope.price = 0;
            }

        }

        function completeUserInfo(){
            $http.get(Main_Conf.apiUrl +'clients/name/' + $scope.userInfo.clientNameAutocomplete)
                .success(function (response) {
                    var returnedUser = response[0];
                    if(returnedUser){
                        $scope.userInfo.clientName = returnedUser.client_name;
                        $scope.userInfo.clientNumber = returnedUser.client_phone;
                        $scope.userInfo.clientEmail = returnedUser.client_email;
                        $scope.userInfo.clientId = returnedUser.client_id; // schimba
                    }
                });
        }

        function getPaymentTypes() {
            BookingRequest.GetPaymentMethods(function (response) {
                angular.forEach(response.data, function (item) {
                    var obj = {
                        paymentName: item.payment_name,
                        paymentId: item.payment_id
                    };

                    $scope.paymentTypes.push(obj);
                });
            });
        }
        function getCarTypes(){
            Car.carTypes(function (response) {
                response.map(function (item) {
                    var obj = {};
                    obj.cartype_name = item.cartype_name;
                    //obj.seats_number = item.seats_number;
                    obj.cartype_id = item.cartype_id;
                    $scope.arrayOfSeats.push(obj);
                });
                // $scope.numberOfSeats = $scope.arrayOfSeats[0];
            });

        }
        function postBooking(){
            if ($scope.price && $scope.distance && $scope.userInfo.clientId && $scope.minutes && $scope.hour){
                var now = new Date();
                var time = now.toLocaleTimeString();
                time = time.substring(0, time.length - 2);
                var bookingModel = {
                    booking_created_date: dateToSqlFormat(new Date()).toISOString().slice(0, 19).replace('T', ' '),
                    booking_dropoff_address: $scope.userInfo.dropoff,
                    booking_dropoff_address_latitude: +dropOffInfo.lat,
                    booking_dropoff_address_longitude: +dropOffInfo.lng,
                    booking_pickup_address: $scope.userInfo.pickup,
                    booking_pickup_address_latitude: +pickupInfo.lat,
                    booking_pickup_address_longitude: +pickupInfo.lng,
                    booking_passenger_number: "2",
                    booking_pickup_time: dateToSqlFormat($scope.userInfo.pickupDate).toISOString().slice(0, 11).replace('T', ' ') + $scope.hour+':'+$scope.minutes+':00',
                    cartodriver_id: $scope.cartodriver_id,
                    booking_arriving_date: calculateDuration($scope.userInfo.pickupDate, $scope.duration).toISOString().slice(0, 19).replace('T', ' '),
                    booking_price: $scope.price,
                    client_id: $scope.userInfo.clientId,
                    company_id: $rootScope.globals.currentUser.company,
                    payment_id: $scope.userInfo.paymentId
                };
                console.log(bookingModel);
                BookingRequest.PostBooking(bookingModel, function (response) {
                    alerting.addSuccess('Booking posted!');
                    $scope.userInfo = {};
                });
            }
            else{
                alerting.addWarning('Check booking info!');
            }
        }
        function setCarId(){
            angular.forEach($scope.arrayOfSeats, function (item) {
                if (item.cartype_name == $scope.userInfo.cartype){
                    $scope.userInfo.carId = item.cartype_id;
                }
            });
        }
        function setPaymentId(){
            angular.forEach($scope.paymentTypes, function(item){
                if(item.paymentName == $scope.userInfo.payment){
                    $scope.userInfo.paymentId = item.paymentId;
                }
            });
        }
        function dateToSqlFormat(date){
            date.setHours(date.getHours() + 3);
            return date;
        }
        function calculateDuration(date, duration){
            date.setSeconds(date.getSeconds() + duration);
            return date;
        }
        function RandomBooking() {
            var randomDate = new Date();
            randomDate.setMonth(randomDate.getMonth() - +(Math.random() * 8));
            var randomHour = +(Math.random() * 24).toFixed(0);
            var randomMinute = +(Math.random() * 60).toFixed(0);
            var randomSecond = +(Math.random() * 60).toFixed(0);
            var duration = +(Math.random() * 1000 + 100).toFixed(0);
            var price = +(Math.random() * 100 + 100).toFixed(0);
            var bookingModel = {
                booking_created_date: dateToSqlFormat(new Date()).toISOString().slice(0, 19).replace('T', ' '),
                booking_dropoff_address: 'To Testing',
                booking_dropoff_address_latitude: 13,
                booking_dropoff_address_longitude: 12,
                booking_pickup_address: 'From Testing',
                booking_passenger_number: "2",
                booking_pickup_time: dateToSqlFormat(randomDate).toISOString().slice(0, 11).replace('T', ' ') + addZeros(randomHour) +':' + addZeros(randomMinute) +':' + addZeros(randomSecond),
                cartodriver_id: "1",
                booking_arriving_date: calculateDuration(randomDate, duration).toISOString().slice(0, 19).replace('T', ' '),
                booking_price: price,
                client_id: 1,
                company_id: $rootScope.globals.currentUser.company,
                payment_id: 1
            };
            BookingRequest.PostBooking(bookingModel, function (response) {
                alerting.addSuccess('Booking posted!');
                $scope.userInfo = {};
            });
            function addZeros(number){
                if (number < 10)
                    number = '0' + number;
                return number;
            }
        }
        function LotsOfRandoms(){
            for (var i = 0; i < 100; i++){
                RandomBooking();
            }
        }
        function getPossibleCars(){
            if (pickupInfo.hasOwnProperty('lat')){
                var obj = {
                    company: $rootScope.globals.currentUser.company,
                    cartype: $scope.userInfo.carId,
                    plat: pickupInfo.lat.toString(),
                    plong: pickupInfo.lng.toString(),
                    pdate: dateToSqlFormat($scope.userInfo.pickupDate).toISOString().slice(0, 11).replace('T', ' ') + $scope.hour+':'+$scope.minutes+':00',
                    ddate: calculateDuration($scope.userInfo.pickupDate, $scope.duration).toISOString().slice(0, 19).replace('T', ' ')
                };
                Car.PossibleCars(obj, function (response) {
                    $scope.possibleCars = response.data;
                });
            }
        }

        function createClient() {
            var client = {
                client_email: $scope.userInfo.clientEmail,
                client_phone: $scope.userInfo.clientNumber,
                client_name: $scope.userInfo.clientName

            };
            $http.post(Main_Conf.apiUrl +'clients/add', client)
                .then(function (response) {
                    $scope.userInfo.clientId = response.data.client_id;
                    alerting.addSuccess('Client created');
                })
                .error(function (err) {
                    console.log(err);
                    alerting.addDanger('Cannot Add Client!');
                });
        }
    }
})();