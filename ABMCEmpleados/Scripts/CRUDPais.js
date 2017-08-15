var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
    //debugger;
    $scope.Add = function () {
        var isValid = Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var pai_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Pais/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pai_codigo }),
                    success: function (data) {
                        if (data.existe == false) {
                            $scope.Pais = {};
                            $scope.Pais.pai_codigo = $scope.CodigoPais;
                            $scope.Pais.pai_nombre = $scope.NombrePais;
                            $http({
                                method: "POST",
                                url: "/Pais/Insert",
                                datatype: "json",
                                data: JSON.stringify($scope.Pais)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAll();
                                $scope.CodigoPais = "";
                                $scope.NombrePais = "";
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            alert("El código de país ingresado ya existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        alert("Ocurrió un error al intentar verificar el código de país.");
                    }
                })
            } else {
                var pai_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Pais/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pai_codigo }),
                    success: function (data) {
                        if (data.existe == true) {
                            console.log("verdadero");
                            $scope.Pais = {};
                            $scope.Pais.pai_codigo = $scope.CodigoPais;
                            $scope.Pais.pai_nombre = $scope.NombrePais;
                            $http({
                                method: "POST",
                                url: "/Pais/Update",
                                datatype: "json",
                                data: JSON.stringify($scope.Pais)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAll();
                                $scope.CodigoPais = "";
                                $scope.NombrePais = "";
                                $("#btnSave").attr("value", "Agregar");
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            alert("El código de país ingresado no existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        alert("Ocurrió un error al intentar verificar el código de país.");
                    }
                })
            }
        }
    };

    $scope.GetAll = function () {
        //debugger;
        $http({
            method: "GET",
            url: "/Pais/GetAll"
        }).then(function (response) {
            //console.log(response);
            $scope.paises = response.data;
            $scope.loading = false;
        }).catch(function (reason) {
            $scope.loading = false;
            console.log(reason);
            alert("Ocurrió un error al intentar obtener los países");
        })
    };

    $scope.Delete = function (Pais) {
        var ans = confirm('¿Está seguro de qué quiere eliminar el país?');
        if (ans) {
            $http({
                method: "POST",
                url: "/Pais/Delete",
                datatype: "json",
                data: JSON.stringify(Pais)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAll();
            })
        }
    };

    $scope.Get = function (Pais) {
        //console.log(Pais);
        $scope.CodigoPais = Pais.pai_codigo;
        $('#inputCodigo').prop('readonly', true);
        $scope.NombrePais = Pais.pai_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
        $scope.loading = false;
    };

    //limpia los textbox.
    $scope.ClearTextBox = function () {
        //console.log("llegue!!");
        //debugger;
        $('#inputCodigo').val("");
        $('#inputCodigo').prop('readonly', false);
        $scope.CodigoPais = "";
        $('#inputNombre').val("");
        $scope.NombrePais = "";
        $("#btnSave").attr("value", "Agregar");
        $scope.loading = false;
    };
})

//función para validar que los campos esten completos
function Validate() {
    var isValid = true;
    var a = "";
    if ($('#inputCodigo').val().trim() == "") {
        alert("Debe completar el código de país.");
        isValid = false;
    }
    if ($('#inputNombre').val().trim() == "") {
        alert("Debe completar el nombre del país.");
        isValid = false;
    }

    return isValid;
}

//esconde el modal cuando se hace click en el botón cerrar o en la cruz.
function dismissModal() {
    $('#myModal').modal('hide');
}