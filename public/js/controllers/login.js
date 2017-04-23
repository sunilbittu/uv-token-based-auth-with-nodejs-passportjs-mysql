(function() {
    angular.module('myApp')
        .controller('loginCtrl', ['$scope', 'Auth', loginCtrl]);

    function loginCtrl($scope, Auth) {

        $scope.loginUser = function() {
            var user = $scope.user;
            Auth.logIn(user.email, user.password)
                .then(function(data) {
                    if (data && data.message && (!data.token)) {
                        var message = data.message;
                        $scope.message = message;
                        $.notify(message, 'error');
                    }
                })
        };

    }

}())
