var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.LogIn = function () {
        $scope.Usuario = {};
        $scope.Usuario.usu_user_name = $scope.UserName;
        $scope.Usuario.usu_password = $scope.Password;
        $scope.Usuario.usu_user_email = $scope.Email;
        $http({
            method: "POST",
            url: "/Ingresar/Login",
            datatype: "json",
            data: JSON.stringify($scope.Usuario)
        }).then(function (response) {
            if (response.data.existe == true) {
                window.location.href = "/Empleado/Index";
            } else {
                $("#alertModal").modal('show'); 
                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
            }
        })
    };

    $scope.HideModal = function () {
        $("#alertModal").modal('hide');
    }
})