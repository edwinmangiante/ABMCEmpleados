var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    //debugger;
    $http({
        method: 'GET',
        url: '/Provincia/GetPaises'
    }).then(function (response) {
        //console.log(response);
        $scope.paises = response.data;
        $scope.currentPais = $scope.paises[0].pai_codigo;
        $scope.GetAllByPais($scope.paises[0].pai_codigo);
    }).catch(function (reason) {
        console.log(reason);
        alert("Ocurrió un error al intentar obtener los países.");
    })

    //debugger;
    $scope.Add = function () {
        var isValid = Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var pro_pai_codigo = $('#inputPais').val().trim();
                var pro_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Provincia/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pro_pai_codigo, codigoProvincia: pro_codigo }),
                    success: function (data) {
                        debugger;
                        if (data.existe == false) {
                            $scope.Provincia = {};
                            console.log($('#inputPais').val());
                            $scope.Provincia.pro_pai_codigo = $scope.currentPais;
                            $scope.Provincia.pro_codigo = $scope.CodigoProvincia;
                            $scope.Provincia.pro_nombre = $scope.NombreProvincia;
                            $http({
                                method: "POST",
                                url: "/Provincia/Insert",
                                datatype: "json",
                                data: JSON.stringify($scope.Provincia)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAllByPais($scope.currentPais);
                                $scope.Provincia.pro_pai_codigo = "";
                                $scope.Provincia.pro_codigo = "";
                                $scope.Provincia.pro_nombre = "";
                                $('#myModal').modal('hide');
                            })
                        } else {
                            alert("El código de provincia ingresado ya existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        alert("Ocurrió un error al intentar verificar el código de provincia.");
                    }
                })
            } else {
                var pro_pai_codigo = $('#inputPais').val().trim();
                var pro_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Provincia/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pro_pai_codigo, codigoProvincia: pro_codigo }),
                    success: function (data) {
                        if (data.existe == true) {
                            $scope.Provincia = {};
                            $scope.Provincia.pro_pai_codigo = $scope.currentPais;
                            $scope.Provincia.pro_codigo = $scope.CodigoProvincia;
                            $scope.Provincia.pro_nombre = $scope.NombreProvincia;
                            $http({
                                method: "POST",
                                url: "/Provincia/Update",
                                datatype: "json",
                                data: JSON.stringify($scope.Provincia)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAllByPais($scope.currentPais);
                                $scope.Provincia.pro_pai_codigo = "";
                                $scope.Provincia.pro_codigo = "";
                                $scope.Provincia.pro_nombre = "";
                                $("#btnSave").attr("value", "Agregar");
                                $('#myModal').modal('hide');
                            })
                        } else {
                            alert("El código de provincia ingresado no existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        alert("Ocurrió un error al intentar verificar el código de provincia.");
                    }
                })
            }
        }
    };

    $scope.GetAll = function () {
        //debugger;
        $http({
            method: "GET",
            url: "/Provincia/GetAll"
        }).then(function (response) {
            //console.log(response);
            $scope.provincias = response.data;
        }).catch(function (reason) {
            console.log(reason);
            alert("Ocurrió un error al intentar obtener las provincias.");
        })
    };

    $scope.GetAllByPais = function (pai_codigo) {
        //debugger;
        $http({
            method: "GET",
            url: "/Provincia/GetAllByPais",
            params: ({ codigoPais: pai_codigo })
        }).then(function (response) {
            //console.log(response);
            $scope.provincias = response.data;
        }).catch(function (reason) {
            console.log(reason);
            alert("Ocurrió un error al intentar obtener las provincias por país.");
        })
    };

    $scope.Delete = function (Provincia) {
        var ans = confirm('¿Está seguro de qué quiere eliminar la provincia?');
        if (ans) {
            $http({
                method: "POST",
                url: "/Provincia/Delete",
                datatype: "json",
                data: JSON.stringify(Provincia)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllByPais($scope.currentPais);
            })
        }
    };

    $scope.Get = function (Provincia) {
        $scope.CodigoPais = Provincia.pro_pai_codigo;
        $('#inputPais').prop('readonly', true);
        $scope.CodigoProvincia = Provincia.pro_codigo;
        $('#inputCodigo').prop('readonly', true);
        $scope.NombreProvincia = Provincia.pro_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
    }
})

//función para validar que los campos esten completos
function Validate() {
    var isValid = true;
    if ($('#inputPais').val().trim() == "") {
        alert("Debe completar el código del país de la provincia.");
        isValid = false;
    }
    if ($('#inputCodigo').val().trim() == "") {
        alert("Debe completar el código de provincia.");
        isValid = false;
    }
    if ($('#inputNombre').val().trim() == "") {
        alert("Debe completar el nombre del provincia.");
        isValid = false;
    }

    return isValid;
}

//esconde el modal cuando se hace click en el botón cerrar o en la cruz.
function dismissModal() {
    $('#myModal').modal('hide');
}

//limpia los textbox.
function clearTextBox(codigoPais) {
    $('#inputPais').val("");
    $('#inputPais').val(codigoPais.trim());
    $('#inputPais').prop('readonly', true);
    $('#inputCodigo').val("");
    $('#inputCodigo').prop('readonly', false);
    $('#inputNombre').val("");
    $("#btnSave").attr("value", "Agregar");
}