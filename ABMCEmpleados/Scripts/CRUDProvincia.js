var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
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
        $scope.loading = false;
        console.log(reason);
        alert("Ocurrió un error al intentar obtener los países.");
    })

    //debugger;
    $scope.Add = function () {
        var isValid = $scope.Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                var pro_codigo = $scope.CodigoProvincia.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Provincia/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pro_pai_codigo, codigoProvincia: pro_codigo }),
                    success: function (data) {
                        //debugger;
                        if (data.existe == false) {
                            $scope.Provincia = {};
                            $scope.Provincia.pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Provincia.pro_codigo = $scope.CodigoProvincia.toUpperCase();
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
                            $scope.loading = false;
                            alert("El código de provincia ingresado ya existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        alert("Ocurrió un error al intentar verificar el código de provincia.");
                    }
                })
            } else {
                var pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                var pro_codigo = $scope.CodigoProvincia.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Provincia/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pro_pai_codigo, codigoProvincia: pro_codigo }),
                    success: function (data) {
                        if (data.existe == true) {
                            $scope.Provincia = {};
                            $scope.Provincia.pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Provincia.pro_codigo = $scope.CodigoProvincia.toUpperCase();
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
                            $scope.loading = false;
                            alert("El código de provincia ingresado no existe.");
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
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
            $scope.loading = false;
            $scope.provincias = response.data;
        }).catch(function (reason) {
            $scope.loading = false;
            console.log(reason);
            alert("Ocurrió un error al intentar obtener las provincias.");
        })
    };

    $scope.GetAllByPais = function (pai_codigo) {
        //debugger;
        var search = $scope.searchNombre;
        $http({
            method: "GET",
            url: "/Provincia/GetAllByPais",
            params: ({ codigoPais: pai_codigo.toUpperCase(), filterNombre: search })
        }).then(function (response) {
            //console.log(response);
            $scope.provincias = response.data;
            $scope.loading = false;
        }).catch(function (reason) {
            console.log(reason);
            $scope.loading = false;
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
        $scope.CodigoPais = Provincia.pro_pai_codigo.toUpperCase();
        $('#inputPais').prop('readonly', true);
        $scope.CodigoProvincia = Provincia.pro_codigo.toUpperCase();
        $('#inputCodigo').prop('readonly', true);
        $scope.NombreProvincia = Provincia.pro_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
        $scope.loading = false;
    }

    //función para validar que los campos esten completos
    $scope.Validate = function () {
        var isValid = true;
        if ($('#inputPais').val().trim() == "" || $scope.CodigoPais == "") {
            alert("Debe completar el código del país de la provincia.");
            isValid = false;
        }
        if ($('#inputCodigo').val().trim() == "" || $scope.CodigoProvincia == "") {
            alert("Debe completar el código de provincia.");
            isValid = false;
        }
        if ($('#inputNombre').val().trim() == "" || $scope.NombreProvincia == "") {
            alert("Debe completar el nombre del provincia.");
            isValid = false;
        }

        return isValid;
    }

    //limpia los textbox.
    $scope.ClearTextBox = function () {
        //debugger;
        var codigoPais = $scope.currentPais.toUpperCase();
        $('#inputPais').val(codigoPais.trim());
        $('#inputPais').prop('readonly', true);
        $scope.CodigoPais = codigoPais.trim();
        $('#inputCodigo').val("");
        $('#inputCodigo').prop('readonly', false);
        $scope.CodigoProvincia = "";
        $('#inputNombre').val("");
        $scope.NombreProvincia = "";
        $("#btnSave").attr("value", "Agregar");
        $scope.loading = false;
    };

    //Ordena ASC y DESC
    $scope.Sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    //esconde el modal cuando se hace click en el botón cerrar o en la cruz.
    $scope.DismissModal = function () {
        $('#myModal').modal('hide');
    }
})