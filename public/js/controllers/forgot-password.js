(function() {
    angular.module('myApp')
        .controller('forgotPasswordCtrl', ['$scope', 'Auth', forgotPasswordCtrl]);

    function forgotPasswordCtrl($scope, Auth) {

        $scope.sendResetLink = function() {
            var user = $scope.user;
            $scope.isSubmitted = true;
            Auth.forgotPassword(user.email)
                .then(function(data) {
                    if (data && data.message && data.isSuccess) {
                        var message = data.message;
                        $scope.message = message;
                        $scope.isSent = data.isSuccess;
                    } else {
                        var message = data.message;
                        $scope.message = message;
                        $scope.isSubmitted = false;
                        $.notify(message, 'error');
                    }
                })
        };

    }

}())
