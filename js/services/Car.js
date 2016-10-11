/**
 * Created by raul on 8/18/2016.
 */
'use strict';
app.factory('Car', function ($http, alerting, Main_Conf) {
    var service = {};

    service.carTypes = Cartypes;
    service.PostDriver = PostDriver;
    service.PostCar = PostCar;
    service.GetDriversWOCars = GetDrivers;
    service.GetCarsWO = GetCarsWO;
    service.AssignLink = AssignLink;
    service.PossibleCars = PossibleCars;

    return service;

    function Cartypes(callback) {
        return $http.get(Main_Conf.apiUrl + 'cartypes')
            .success(function (response) {
                console.log('fetched cars');
                callback(response);
            })
            .error(function (err) {
                alerting.addDanger('Cannot load cartypes!');
            });
    }

    function GetDrivers(callback) {
        $http.get(Main_Conf.apiUrl + 'drivers/dwc')
            .then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                alerting.addDanger('Drivers get error!');
            })
    }

    function GetCarsWO (callback){
        $http.get(Main_Conf.apiUrl + 'cars/cwd')
            .then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                alerting.addDanger('Cars get error!');
            })
    }

    function PostDriver(resource, callback){
        $http.post(Main_Conf.apiUrl + 'drivers/add', resource)
            .then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                alerting.addDanger('Cannot add driver!');
            });
    }

    function PostCar(resource, callback) {
        $http.post(Main_Conf.apiUrl + 'cars/add', resource)
            .then(function(response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                alerting.addDanger('Cannot add car!');
            })
    }

    function AssignLink(linkObj, callback){
        $http.post(Main_Conf.apiUrl + 'ctd/add', linkObj)
            .then(function (response) {
                callback(response);
            })
            .catch(function (err) {
                console.log(err);
                alerting.addDanger('Error assigning car to driver!');
            })
    }

    function PossibleCars(cartype, callback){
        $http({
            method: 'GET',
            headers: cartype,
            url: Main_Conf.apiUrl + 'ctd/distance'
        }).then(function (response) {
            callback(response);
        }).catch(function (err) {
            console.log(err);
            alerting.addDanger('error getting available cars');
        })

    }
});