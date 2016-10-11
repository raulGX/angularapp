/**
 * Created by raul on 9/13/2016.
 */
(function () {
    'use strict';
    angular.module('myApp')
        .controller('DriverToCarCtrl', DriverToCarCtrl);

    DriverToCarCtrl.$inject = ['$scope', 'Car', 'alerting', '$rootScope'];
    function DriverToCarCtrl($scope, Car, alerting, $rootScope){
        $scope.driverInfo = {};
        $scope.addDriver = addDriver;

        $scope.carInfo = {};
        $scope.addCar = addCar;

        $scope.drivers = [];

        $scope.cartypes = [];
        Car.carTypes(function (response) {
            $scope.cartypes = response;
        });
        $scope.assignD = postCarDriverLink;

        getCarsWoD();
        getDriversWOC();

        initAutocomplete();
        function initAutocomplete(){
            var autocompleteAddress;
            // Create the autocomplete object, restricting the search to geographical
            // location types.
            autocompleteAddress = new google.maps.places.Autocomplete(
                /** @type {!HTMLInputElement} */(document.getElementById('driver-address')),
                {types: ['geocode'], componentRestrictions: {country: 'ro'}}
            );


            autocompleteAddress.addListener('place_changed', fillInAddress);

            function fillInAddress() {
                $scope.driverInfo.driver_garage = document.getElementById('driver-address').value;
                var place = autocompleteAddress.getPlace();
                $scope.driverInfo.driver_garage_latitude = place.geometry.location.lat();
                $scope.driverInfo.driver_garage_longitude = place.geometry.location.lng()
            }
        }

        function getCarsWoD() {
            Car.GetCarsWO(function (response) {
                $scope.cars = response.data;
            })
        }

        function getDriversWOC(){
            Car.GetDriversWOCars(function (response) {
                $scope.drivers = [];
                angular.forEach(response.data, function (driver) {
                    var obj = {
                        name: driver.driver_name,
                        id: driver.driver_id
                    };
                    $scope.drivers.push(obj);
                });
            });
        }

        function addDriver() {
            $scope.driverInfo.driver_garage = document.getElementById('driver-address').value;
            // var garage = $scope.driverInfo.driver_garage;
            // var string = 'Address: ' + garage.address + ' lat:' + garage.lat + ' long:' + garage.long;
            // $scope.driverInfo.driver_garage = string;
            $scope.driverInfo.company_id = $rootScope.globals.currentUser.company;
            Car.PostDriver($scope.driverInfo, function (response) {
                alerting.addSuccess('Driver added!');
                getDriversWOC();
                $scope.driverInfo = {};
                // $scope.driverInfo = {};
            })
        }

        function addCar() {
            $scope.carInfo.company_id = $rootScope.globals.currentUser.company;
            Car.PostCar($scope.carInfo, function (response) {
                alerting.addSuccess('Car posted!');
                getCarsWoD();
                $scope.carInfo = {};
            })
        }

        function postCarDriverLink(driver, car){
            var postingObj = {
                driver_id: driver,
                car_id: car,
                company_id: $rootScope.globals.currentUser.company
            };
            Car.AssignLink(postingObj, function (response) {
                alerting.addSuccess('Added car to driver!');
                getCarsWoD();
                getDriversWOC();
            })
        }
    }
})();
