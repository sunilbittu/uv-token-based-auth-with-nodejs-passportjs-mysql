(function() {
    angular.module('myApp')
        .factory('Auth', ['$http', '$location', 'TokenServ', 'AUTH_SERVER', Auth])

    function Auth($http, $location, TokenServ, AUTH_SERVER) {

        function saveTokenIfExist(res) {
            var data = res.data;
            if (data && data.token) {
                var token = data.token;
                // console.log(token);
                TokenServ.setToken(token);
                $location.path('/profile')
            }
            return data;
        }

        function register(email, name, password) {
            var user = {
                email: email,
                name: name,
                password: password
            };

            return $http.post(AUTH_SERVER.register, user)
                .then(saveTokenIfExist)
                .then(function(data) {
                    if (data && data.token) {
                        $location.path('/profile')
                    }
                    return data;
                })
        }

        function isLoggedIn() {
            return TokenServ.getToken();
        }

        function logIn(email, password) {
            return $http.post(AUTH_SERVER.login, { email: email, password: password })
                .then(saveTokenIfExist)
                .then(function(data) {
                    if (data && data.token) {
                        $location.path('/profile')
                    }
                    return data;
                })
        }

        function logOut() {
            TokenServ.removeToken();
        }

        function forgotPassword(email) {
            return $http.post(AUTH_SERVER.forgotPassword, { email: email })
                .then(function(res) {
                    var data = res.data;
                    return data;
                })
        }

        return {
            register: register,
            isLoggedIn: isLoggedIn,
            logOut: logOut,
            logIn: logIn,
            forgotPassword: forgotPassword
        }
    }
}())
