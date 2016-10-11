/**
 * Created by raul on 8/23/2016.
 */
(function () {
    angular
        .module('myApp')
        .factory('BookingRequest', BookingRequest);

    BookingRequest.$inject = ['$http', 'alerting', 'Main_Conf'];
    function BookingRequest($http, alerting, Main_Conf) {
        var service = {};

        service.GetById = GetById;
        service.GetUsersBySearch = GetUsersBySearch;
        service.GetBookings = GetBookings;
        service.GetPaymentMethods = GetPaymentMethods;
        service.PostBooking = PostBooking;

        return service;

        function GetById(bookingId, successCallback){
            $http.get('' + bookingId)
                .success(function (response) {
                    successCallback(response);
                })
                .error(function (err) {
                    alerting.addDanger('Error getting booking ' + bookingId);
                });

        }

        function GetUsersBySearch(query) {
            return $http.get(Main_Conf.apiUrl +'clients/name/' + query)
                .then(function (response) {
                    if(response.data instanceof Array){
                        return response.data.map(function(item){
                            return item.client_name;
                        });
                    }
                })
        }

        function GetPaymentMethods(successCallback) {
            return $http.get(Main_Conf.apiUrl + '/payments')
                .then(function (response) {

                    successCallback(response);
                })
                .catch(function (err) {
                    alerting.addDanger('Error getting the payment methods');
                })
        }

        function PostBooking(info, callback) {
            $http.post(Main_Conf.apiUrl+'bookings/add', info)
                .then(function (results) {
                    callback(results);
                })
                .catch(function (err) {
                   alerting.addDanger('Booking error!');
                });
        }

        function GetBookings(page, itemsPerPage, callback){
            $http.get(Main_Conf.apiUrl + 'bookings/' + itemsPerPage + '/' + page)
                .then(function(result) {
                    callback(result);
                })
                .catch(function (err) {
                    console.log(err);
                    alerting.addDanger('Can\' get bookings');
                });
        }
    }
})();