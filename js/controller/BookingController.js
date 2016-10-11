/**
 * Created by raul on 8/23/2016.
 */
(function () {
    angular
        .module('myApp')
        .controller('BookingsCtrl', BookingsCtrl);

    BookingsCtrl.$inject = ['$scope', 'alerting', 'BookingRequest'];

    function BookingsCtrl($scope, alerting, BookingRequest){
        $scope.bookings = [];
        $scope.totalBookings = 0;
        $scope.bookingsPerPage = 20; // this should match however many results your API puts on one page
        getResultsPage(1);

        $scope.pagination = {
            current: 1
        };

        $scope.pageChanged = function(newPage) {
            getResultsPage(newPage);
        };

        $scope.getTheId = function () {
            var page = $scope.pagination.current;
            return (page - 1) * $scope.bookingsPerPage;
        };
        
        function getResultsPage(pageNumber) {
            // this is just an example, in reality this stuff should be in a service
            BookingRequest.GetBookings(pageNumber, $scope.bookingsPerPage, function (result) {
                $scope.bookings = result.data.data;
                $scope.totalBookings = result.data.results;
            });

            // var begin = (pageNumber - 1) * $scope.bookingsPerPage;
            // var end = begin + $scope.bookingsPerPage;
            // var resultinios = statistics.resultinios;
            // $scope.bookings = resultinios.slice(begin, end);
            // $scope.totalBookings = resultinios.length;
        }

    }
})();