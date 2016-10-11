'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ui.bootstrap', 'ngRoute', 'ngCookies', 'psFramework', 'angularUtils.directives.dirPagination']);
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when('/newbooking',{
        templateUrl: 'views/booking.html',
        controller: 'NewBookingCtrl'
    });
    $routeProvider.when('/',{
        templateUrl: 'views/Dashboard.html',
        controller: 'DashboardCtrl'
    });
    $routeProvider.when('/login',{
        templateUrl: 'views/login.html',
        controller: 'LoginCtrl'
    });
    $routeProvider.when('/logout',{
        template: '',
        controller: 'LogoutCtrl'
    });
    $routeProvider.when('/bookings',{
        templateUrl: 'views/companyBookings.html',
        controller: 'BookingsCtrl'
    });
    $routeProvider.when('/statistics',{
        templateUrl: 'views/statistics.html',
        controller: 'StatisticsCtrl'
    });
    $routeProvider.when('/drivertocar',{
        templateUrl: 'views/drivertocar.html',
        controller: 'DriverToCarCtrl'
    });
    $routeProvider.otherwise({redirectTo: '/'});
});

app.run(run);
run.$inject = ['$rootScope', '$location', '$cookieStore', '$http', 'alerting'];
function run($rootScope, $location, $cookieStore, $http, alerting) {
    // keep user logged after refresh
    $rootScope.globals = $cookieStore.get('globals') || {};
    if ($rootScope.globals.currentUser){
        $http.defaults.headers.common.company = $rootScope.globals.currentUser.company; // jshint ignore:line

    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
        var restrictedPage = $.inArray($location.path(), ['/login', '/register']);
        var loggedIn = $rootScope.globals.currentUser;

        if (restrictedPage && !loggedIn){
            $location.path('/login');
        }

    });

}