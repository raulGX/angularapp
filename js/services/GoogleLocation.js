/**
 * Created by raul on 8/18/2016.
 */
app.factory('GoogleLocation', function ($http, Main_Conf, $rootScope) {
    function getLocation(loc) {
        if (loc) {
            delete($http.defaults.headers.common['Authorization']);
            return $http.get(Main_Conf.locationUrl, {
                params: {
                    address: loc,
                    sensor: false,
                    region: 'ro',
                    components: "country:RO"
                }

            }).then(function (response) {
                $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
                var theArray = response.data.results.map(function (item) {
                    return item.formatted_address;
                });
                return theArray;
            }).catch(function (err) {
                console.log(err.data);
            });
        }
    }
    function getPrice(userInfo){
        var service = new google.maps.DistanceMatrixService;
        service.getDistanceMatrix({
            origins: [userInfo.pickup],
            destinations: [userInfo.dropoff],
            travelMode: 'DRIVING',
            unitSystem: google.maps.UnitSystem.METRIC,
            avoidHighways: false,
            avoidTolls: false
        }, function(response, status) {
            if (status !== 'OK') {
                alert('Error was: ' + status);
            } else {
                $scope.plm = response.rows[0].elements[0].distance.text;
            }
        });
    }
    return{
        getLocation: getLocation,
        getPrice: getPrice
    };

});
