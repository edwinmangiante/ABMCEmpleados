var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
    //debugger;
    $http({
        method: 'GET',
        url: '/Ciudad/GetPaises'
    }).then(function (response) {
        //console.log(response);
        $scope.paises = response.data;
        $scope.currentPais = $scope.paises[0].pai_codigo;
        $scope.GetAllByPais($scope.paises[0].pai_codigo);
    }).catch(function (reason) {
        $scope.loading = false;
        console.log(reason);
        alert("Ocurrió un error al intentar obtener los países.");
    })

    $scope.GetAllByPais = function (pai_codigo) {
        //debugger;
        $http({
            method: 'GET',
            url: '/Ciudad/GetProvincias',
            params: ({ codigoPais: pai_codigo })
        }).then(function (response) {
            //console.log(response);
            $scope.provincias = response.data;
            $scope.currentProvincia = $scope.provincias[0].pro_codigo;
            $scope.GetAllByPaisAndProvincia($scope.provincias[0].pro_pai_codigo, $scope.provincias[0].pro_codigo);
        }).catch(function (reason) {
            $scope.loading = false;
            console.log(reason);
            alert("Ocurrió un error al intentar obtener las provincias.");
        })
    }

    //debugger;
    $scope.Add = function () {
        var isValid = Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var ciu_pro_pai_codigo = $('#inputPais').val().trim();
                var ciu_pro_codigo = $('#inputProvincia').val().trim();
                var ciu_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Ciudad/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: ciu_pro_pai_codigo, codigoProvincia: ciu_pro_codigo, codigoCiudad: ciu_codigo }),
                    success: function (data) {
                        if (data.existe == false) {
                            $scope.Ciudad = {};
                            //console.log($('#inputPais').val());
                            $scope.Ciudad.ciu_pro_pai_codigo = $scope.currentPais;
                            $scope.Ciudad.ciu_pro_codigo = $scope.currentProvincia;
                            $scope.Ciudad.ciu_codigo = $scope.CodigoCiudad;
                            $scope.Ciudad.ciu_nombre = $scope.NombreCiudad;
                            $http({
                                method: "POST",
                                url: "/Ciudad/Insert",
                                datatype: "json",
                                data: JSON.stringify($scope.Ciudad)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                                $scope.Ciudad.ciu_pro_pai_codigo = "";
                                $scope.Ciudad.ciu_pro_codigo = "";
                                $scope.Ciudad.ciu_codigo = "";
                                $scope.Ciudad.ciu_nombre = "";
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            alert("El código de la ciudad ingresado ya existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        $scope.loading = false;
                        alert("Ocurrió un error al intentar verificar el código de ciudad.");
                    }
                })
            } else {
                var ciu_pro_pai_codigo = $('#inputPais').val().trim();
                var ciu_pro_codigo = $('#inputProvincia').val().trim();
                var ciu_codigo = $('#inputCodigo').val().trim();
                $.ajax({
                    type: "GET",
                    url: "/Ciudad/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: ciu_pro_pai_codigo, codigoProvincia: ciu_pro_codigo, codigoCiudad: ciu_codigo }),
                    success: function (data) {
                        if (data.existe == true) {
                            $scope.Ciudad = {};
                            //console.log($('#inputPais').val());
                            $scope.Ciudad.ciu_pro_pai_codigo = $scope.currentPais;
                            $scope.Ciudad.ciu_pro_codigo = $scope.currentProvincia;
                            $scope.Ciudad.ciu_codigo = $scope.CodigoCiudad;
                            $scope.Ciudad.ciu_nombre = $scope.NombreCiudad;
                            $http({
                                method: "POST",
                                url: "/Ciudad/Update",
                                datatype: "json",
                                data: JSON.stringify($scope.Ciudad)
                            }).then(function (response) {
                                alert(response.data);
                                $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                                $scope.Ciudad.ciu_pro_pai_codigo = "";
                                $scope.Ciudad.ciu_pro_codigo = "";
                                $scope.Ciudad.ciu_codigo = "";
                                $scope.Ciudad.ciu_nombre = "";
                                $("#btnSave").attr("value", "Agregar");
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            alert("El código de ciudad ingresado no existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        $scope.loading = false;
                        alert("Ocurrió un error al intentar verificar el código de ciudad.");
                    }
                })
            }
        }
    };

    $scope.GetAll = function () {
        //debugger;
        $http({
            method: "GET",
            url: "/Ciudad/GetAll"
        }).then(function (response) {
            //console.log(response);
            $scope.ciudades = response.data;
            $scope.loading = false;
        }).catch(function (reason) {
            console.log(reason);
            $scope.loading = false;
            alert("Ocurrió un error al intentar obtener las ciudades.");
        })
    };

    $scope.GetAllByPaisAndProvincia = function (pai_codigo, pro_codigo) {
        //debugger;
        var search = $scope.searchNombre;
        $http({
            method: "GET",
            url: "/Ciudad/GetAllByPaisAndProvincia",
            params: ({ codigoPais: pai_codigo, codigoProvincia: pro_codigo, filterNombre: search })
        }).then(function (response) {
            //console.log(response);
            $scope.ciudades = response.data;
            $scope.loading = false;
        }).catch(function (reason) {
            console.log(reason);
            $scope.loading = false;
            alert("Ocurrió un error al intentar obtener las ciudades por país y provincia.");
        })
    };

    $scope.Delete = function (Ciudad) {
        var ans = confirm('¿Está seguro de qué quiere eliminar la ciudad?');
        if (ans) {
            $http({
                method: "POST",
                url: "/Ciudad/Delete",
                datatype: "json",
                data: JSON.stringify(Ciudad)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
            })
        }
    };

    $scope.Get = function (Ciudad) {
        $scope.CodigoPais = Ciudad.ciu_pro_pai_codigo;
        $('#inputPais').prop('readonly', true);
        $scope.CodigoProvincia = Ciudad.ciu_pro_codigo;
        $('#inputProvincia').prop('readonly', true);
        $scope.CodigoCiudad = Ciudad.ciu_codigo;
        $('#inputCodigo').prop('readonly', true);
        $scope.NombreCiudad = Ciudad.ciu_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
        $scope.loading = false;
    }

    //limpia los textbox.
    $scope.ClearTextBox = function () {
        //debugger;
        var codigoPais = $scope.currentPais;
        $('#inputPais').val(codigoPais.trim());
        $('#inputPais').prop('readonly', true);
        $scope.CodigoPais = codigoPais.trim();
        var codigoProvincia = $scope.currentProvincia;
        $('#inputProvincia').val(codigoProvincia.trim());
        $('#inputProvincia').prop('readonly', true);
        $scope.CodigoProvincia = codigoProvincia.trim();
        $('#inputCodigo').val("");
        $('#inputCodigo').prop('readonly', false);
        $scope.CodigoCiudad = "";
        $('#inputNombre').val("");
        $scope.NombreCiudad = "";
        $("#btnSave").attr("value", "Agregar");
        $scope.loading = false;
    }
})

//función para validar que los campos esten completos
function Validate() {
    var isValid = true;
    if ($('#inputPais').val().trim() == "") {
        alert("Debe completar el código del país al que pertenece la ciudad.");
        isValid = false;
    }
    if ($('#inputProvincia').val().trim() == "") {
        alert("Debe completar el código de la provincia a la que pertenece la ciudad.");
        isValid = false;
    }
    if ($('#inputCodigo').val().trim() == "") {
        alert("Debe completar el código de la ciudad.");
        isValid = false;
    }
    if ($('#inputNombre').val().trim() == "") {
        alert("Debe completar el nombre de la ciudad.");
        isValid = false;
    }

    return isValid;
}

//esconde el modal cuando se hace click en el botón cerrar o en la cruz.
function dismissModal() {
    $('#myModal').modal('hide');
}