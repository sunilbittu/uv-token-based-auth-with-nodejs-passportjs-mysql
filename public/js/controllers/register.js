'use strict';
(function() {
    angular.module('myApp')
        .controller('registerCtrl', ['$scope', 'Auth', registerCtrl]);

    function registerCtrl($scope, Auth) {

        $scope.registerUser = function() {
            var email = $scope.user.email;
            var name = $scope.user.name;
            var password = $scope.user.password;
            Auth.register(email, name, password)
                .then(function(data) {
                    if (data && data.message && (!data.success)) {
                        $scope.message = data.message;
                    }
                })
        }

    }
}())
