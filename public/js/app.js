(function() {
    var app = angular.module('myApp', ['ngRoute']);
    app.run(['$rootScope', '$location', '$route', 'Auth', function($rootScope, $location, $route, Auth) {
        function logOut() {
            Auth.logOut()
        };

        function onRouteChangeStartHandler(ev, next, current) {
            var isLoggedIn = Auth.isLoggedIn();
            $rootScope.isLoggedIn = isLoggedIn;
            var redirectToLoginPage = (next.$$route && next.$$route.isAuthNeeded && (!isLoggedIn));
            if (redirectToLoginPage) {
                $location.path('/login');
            }

        }

        $rootScope.logOut = logOut;
        $rootScope.$on('$routeChangeStart', onRouteChangeStartHandler)
    }]);

    app.constant('API_SERVER', {
        user: 'http://localhost:3000/api/user'
    });

    app.constant('AUTH_SERVER', {
        register: 'http://localhost:3000/auth/register',
        login: 'http://localhost:3000/auth/login'
    });

    app.config(['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/profile', {
                templateUrl: '../partials/user-profile.html',
                controller: 'profileCtrl',
                isAuthNeeded: true
            })
            .when('/login', {
                templateUrl: '../partials/login.html',
                controller: 'loginCtrl',
                isAuthNeeded: false
            })
            .when('/register', {
                templateUrl: '../partials/register.html',
                controller: 'registerCtrl',
                isAuthNeeded: false
            })
            .otherwise('/profile')
    }])

    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.interceptors.push('HttpAuthInterceptorServ');
    }]);

}())
