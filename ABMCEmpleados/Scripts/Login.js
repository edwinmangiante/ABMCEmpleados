var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.LogIn = function () {
        var isValid = $scope.Validate();

        if (isValid) {
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
        }
    };

    $scope.Validate = function () {
        var isValid = true;
        var message = "";
        if ($scope.UserName == null) {
            isValid = false;
            message = "Debe ingresar el nombre de usuario.";
        }

        if ($scope.Email == null) {
            isValid = false;
            if (message.trim() != null || message.trim() != "")
                message += " ";
            message += "Debe ingresar el e-mail.";
        }

        if ($scope.Password == null) {
            isValid = false;
            if (message.trim() != null || message.trim() != "")
                message += " ";
            message += "Debe ingresar la contraseña.";
        }

        return isValid;
    };

    $scope.HideModal = function () {
        $("#alertModal").modal('hide');
    };
})