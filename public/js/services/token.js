(function() {
    angular.module('myApp')
        .factory('TokenServ', ['$window', TokenServ])

    function TokenServ($window) {
        var storageServ = $window.sessionStorage;
        var key = 'token';

        function getToken() {
            return sessionStorage.getItem(key);
        }

        function setToken(token) {
            if (token && typeof token === 'string') {
                storageServ.setItem(key, token);
            }
        }

        function removeToken() {
            storageServ.removeItem(key);
        }

        return {
            removeToken: removeToken,
            getToken: getToken,
            setToken: setToken
        };
    }
}())
