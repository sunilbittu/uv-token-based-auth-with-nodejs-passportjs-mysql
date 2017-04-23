(function() {
    angular.module('myApp')
        .factory('Profile', ['$http', 'API_SERVER', Profile]);

    function Profile($http, API_SERVER) {
        function getUser() {
            return $http.get(API_SERVER.user)
                .then(function(res) {
                    return res.data;
                })
        }

        return {
            getUser: getUser,
            get: getUser
        }

    }

}())
