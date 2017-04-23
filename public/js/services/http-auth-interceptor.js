(function() {
    angular.module('myApp')
        .factory('HttpAuthInterceptorServ', ['TokenServ', HttpAuthIntreptorServ])

    function HttpAuthIntreptorServ(TokenServ) {
        function request(config) {
            config.headers = config.headers || {};
            var token = TokenServ.getToken();
            if (token) {
                config.headers['x-access-token'] = token;
                config.headers.Authorization = token;
            }
            // console.log(config.headers)
            return config;
        }

        return {
            request: request
        };
    }
}())
