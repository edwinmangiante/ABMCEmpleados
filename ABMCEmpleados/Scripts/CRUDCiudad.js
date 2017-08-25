var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
    //debugger;
    $http({
        method: 'GET',
        url: '/Ciudad/GetPaises'
    }).then(function (response) {
        if (response.data != null) {
            $scope.paises = response.data;
            $scope.currentPais = $scope.paises[0].pai_codigo;
            $scope.GetAllByPais($scope.paises[0].pai_codigo);
        } else {
            $scope.loading = false;
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
            window.location.href = "/Ingresar/Index";
        }
    }).catch(function (reason) {
        $scope.loading = false;
        console.log(reason);
        //alert("Ocurrió un error al intentar obtener los países.");
        $("#alertModal").modal('show');
        $scope.title = "Error!";
        $scope.msg = "Ocurrió un error al intentar obtener los países.";
    })

    $scope.GetAllByPais = function (pai_codigo) {
        //debugger;
        $http({
            method: 'GET',
            url: '/Ciudad/GetProvincias',
            params: ({ codigoPais: pai_codigo })
        }).then(function (response) {
            if (response.data != null) {
                $scope.provincias = response.data;
                $scope.currentProvincia = $scope.provincias[0].pro_codigo;
                $scope.GetAllByPaisAndProvincia($scope.provincias[0].pro_pai_codigo, $scope.provincias[0].pro_codigo);
            } else {
                $scope.loading = false;
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                window.location.href = "/Ingresar/Index";
            }
        }).catch(function (reason) {
            $scope.loading = false;
            console.log(reason);
            //alert("Ocurrió un error al intentar obtener las provincias.");
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "Ocurrió un error al intentar obtener las provincias por país.";
        })
    }

    $scope.Add = function () {
        var isValid = $scope.Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var ciu_pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                var ciu_pro_codigo = $scope.CodigoProvincia.toUpperCase();
                var ciu_codigo = $scope.CodigoCiudad.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Ciudad/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: ciu_pro_pai_codigo, codigoProvincia: ciu_pro_codigo, codigoCiudad: ciu_codigo }),
                    success: function (data) {
                        if (data.existe == 1) {
                            $scope.Ciudad = {};
                            $scope.Ciudad.ciu_pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Ciudad.ciu_pro_codigo = $scope.CodigoProvincia.toUpperCase();
                            $scope.Ciudad.ciu_codigo = $scope.CodigoCiudad.toUpperCase();
                            $scope.Ciudad.ciu_nombre = $scope.NombreCiudad;
                            $http({
                                method: "POST",
                                url: "/Ciudad/Insert",
                                datatype: "json",
                                data: JSON.stringify($scope.Ciudad)
                            }).then(function (response) {
                                //alert(response.data);
                                $('#myModal').modal('hide');
                                $("#alertModal").modal('show');
                                if (response.data.rta == -1) {
                                    $scope.loading = false;
                                    $scope.title = "Error!";
                                    $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                    window.location.href = "/Ingresar/Index";
                                } else {
                                    if (response.data.rta == 0) {
                                        $scope.title = "Agregada!";
                                        $scope.msg = "Se agregó la ciudad satisfactoriamente.";
                                    } else if (response.data.rta == 1) {
                                        $scope.title = "Error!";
                                        $scope.msg = "No se pudo agregar la ciudad, intente nuevamente.";
                                    }
                                    $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                                    $scope.Ciudad.ciu_pro_pai_codigo = "";
                                    $scope.Ciudad.ciu_pro_codigo = "";
                                    $scope.Ciudad.ciu_codigo = "";
                                    $scope.Ciudad.ciu_nombre = "";
                                }
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de la ciudad ingresado ya existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            if (data.existe == 0) {
                                $scope.msg = "El código de ciudad ingresado ya existe.";
                            } else if (data.existe == 2) {
                                $scope.msg = "El código de ciudad es nulo.";
                            } else if (data.existe == -1) {
                                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                window.location.href = "/Ingresar/Index";
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        $scope.loading = false;
                        //alert("Ocurrió un error al intentar verificar el código de ciudad.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de ciudad.";
                    }
                })
            } else {
                var ciu_pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                var ciu_pro_codigo = $scope.CodigoProvincia.toUpperCase();
                var ciu_codigo = $scope.CodigoCiudad.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Ciudad/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: ciu_pro_pai_codigo, codigoProvincia: ciu_pro_codigo, codigoCiudad: ciu_codigo }),
                    success: function (data) {
                        if (data.existe == 0) {
                            $scope.Ciudad = {};
                            $scope.Ciudad.ciu_pro_pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Ciudad.ciu_pro_codigo = $scope.CodigoProvincia.toUpperCase();
                            $scope.Ciudad.ciu_codigo = $scope.CodigoCiudad.toUpperCase();
                            $scope.Ciudad.ciu_nombre = $scope.NombreCiudad;
                            $http({
                                method: "POST",
                                url: "/Ciudad/Update",
                                datatype: "json",
                                data: JSON.stringify($scope.Ciudad)
                            }).then(function (response) {
                                //alert(response.data);
                                $('#myModal').modal('hide');
                                $("#alertModal").modal('show');
                                if (response.data.rta == -1) {
                                    $scope.loading = false;
                                    $scope.title = "Error!";
                                    $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                    window.location.href = "/Ingresar/Index";
                                } else {
                                    if (response.data.rta == 0) {
                                        $scope.title = "Actualizado!";
                                        $scope.msg = "Se actualizó la ciudad satisfactoriamente.";
                                    } else if (response.data.rta == 1) {
                                        $scope.title = "Error!";
                                        $scope.msg = "No se pudo actualizar la ciudad, intente nuevamente.";
                                    }
                                    $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                                    $scope.Ciudad.ciu_pro_pai_codigo = "";
                                    $scope.Ciudad.ciu_pro_codigo = "";
                                    $scope.Ciudad.ciu_codigo = "";
                                    $scope.Ciudad.ciu_nombre = "";
                                    $("#btnSave").attr("value", "Agregar");
                                }
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de ciudad ingresado no existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            if (data.existe == 1) {
                                $scope.msg = "El código de ciudad ingresado no existe.";
                            } else if (data.existe == 2) {
                                $scope.msg = "El código de ciudad es nulo.";
                            } else if (data.existe == -1) {
                                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                window.location.href = "/Ingresar/Index";
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        $scope.loading = false;
                        //alert("Ocurrió un error al intentar verificar el código de ciudad.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de ciudad.";
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
            $scope.ciudades = response.data;
            $scope.loading = false;
        }).catch(function (reason) {
            console.log(reason);
            $scope.loading = false;
            //alert("Ocurrió un error al intentar obtener las ciudades.");
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "Ocurrió un error al intentar obtener las ciudades.";
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
            $scope.loading = false;
            if (response.data != null) {
                $scope.ciudades = response.data;
            } else {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                window.location.href = "/Ingresar/Index";
            }
        }).catch(function (reason) {
            console.log(reason);
            $scope.loading = false;
            //alert("Ocurrió un error al intentar obtener las ciudades por país y provincia.");
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "Ocurrió un error al intentar obtener las ciudades por país y provincia.";
        })
    };

    $scope.Delete = function () {
        //debugger;
        var Action = $("#btnYesNo").val();
        if (Action == "Si") {
            $http({
                method: "POST",
                url: "/Ciudad/Delete",
                datatype: "json",
                data: JSON.stringify($scope.CiudadSeleccionada)
            }).then(function (response) {
                //alert(response.data);
                $('#modalConfirmYesNo').modal('hide');
                $("#alertModal").modal('show');
                if (response.data.rta == -1) {
                    $scope.loading = false;
                    $scope.title = "Error!";
                    $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                    window.location.href = "/Ingresar/Index";
                } else {
                    if (response.data.rta == 0) {
                        $scope.title = "Eliminado!";
                        $scope.msg = "Se eliminó la ciudad satisfactoriamente.";
                    } else if (response.data.rta == 1) {
                        $scope.title = "Error!";
                        $scope.msg = "No se pudo eliminar la ciudad, intente nuevamente.";
                    }
                    $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                }
            })
        }
    };

    $scope.Get = function (Ciudad) {
        $scope.CodigoPais = Ciudad.ciu_pro_pai_codigo.toUpperCase();
        $('#inputPais').prop('readonly', true);
        $scope.CodigoProvincia = Ciudad.ciu_pro_codigo.toUpperCase();
        $('#inputProvincia').prop('readonly', true);
        $scope.CodigoCiudad = Ciudad.ciu_codigo.toUpperCase();
        $('#inputCodigo').prop('readonly', true);
        $scope.NombreCiudad = Ciudad.ciu_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
        $scope.loading = false;
    };

    //exporta los elemetos que se estan mostrando en la grilla a excel.
    $scope.Export = function () {
        if ($scope.ciudades != null && $scope.ciudades.length > 0) {
            //exporta directamente desde angular, funciona. (No se le puede dar ningún formato, por eso voy al C#)
            //alasql('SELECT * INTO XLSX("ciudades.xlsx",{headers:true}) FROM ?', [$scope.ciudades]);
            $http({
                method: "POST",
                url: "/Ciudad/ExportToExcel",
                datatype: "json",
                data: JSON.stringify($scope.ciudades)
            }).then(function (response) {
                //alert(response.data);
                $("#alertModal").modal('show');
                if (response.data.rta == -1) {
                    $scope.loading = false;
                    $scope.title = "Error!";
                    $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                    window.location.href = "/Ingresar/Index";
                } else {
                    if (response.data.rta == 0) {
                        $scope.title = "Exportado!";
                        $scope.msg = "Se creó el excel correctamente en el directorio " + response.data.dir + ".";
                    } else if (response.data.rta == 1) {
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar crear el excel, intente nuevamente. (" + response.data.exMsg + ")";
                    }
                    $scope.GetAllByPaisAndProvincia($scope.currentPais, $scope.currentProvincia);
                }
            }).catch(function (reason) {
                console.log(reason);
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Ocurrió un error al intentar exportar a excel las ciudades.";
            })
        } else {
            //alert('No hay registros para exportar a excel');
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "No hay registros para exportar a excel.";
        }
    };

    //función para validar que los campos esten completos
    $scope.Validate = function () {
        var isValid = true;
        /*if ($('#inputPais').val().trim() == "" || $scope.CodigoPais == "") {
            alert("Debe completar el código del país al que pertenece la ciudad.");
            isValid = false;
        }
        if ($('#inputProvincia').val().trim() == "" || $scope.CodigoProvincia == "") {
            alert("Debe completar el código de la provincia a la que pertenece la ciudad.");
            isValid = false;
        }*/

        if ($('#inputCodigo').val().trim() == "" || $scope.CodigoCiudad == "") {
            //alert("Debe completar el código de la ciudad.");
            isValid = false;
        }
        if (isValid) {
            if ($('#inputNombre').val().trim() == "" || $scope.NombreCiudad == "") {
                //alert("Debe completar el nombre de la ciudad.");
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el nombre de la ciudad.";
                isValid = false;
            }
        } else {
            if ($('#inputNombre').val().trim() == "" || $scope.NombreCiudad == '') {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código y el nombre de la ciudad.";
            } else {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código de la ciudad.";
            }
        }

        return isValid;
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
    };

    //Ordena ASC y DESC
    $scope.Sort = function (keyname) {
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };

    //esconde el modal cuando se hace click en el botón cerrar o en la cruz.
    $scope.DismissModal = function () {
        $('#myModal').modal('hide');
    };

    $scope.HideAlertModal = function () {
        $('#alertModal').modal('hide');
    };

    $scope.HideYesNoModal = function () {
        $('#modalConfirmYesNo').modal('hide');
    };

    $scope.ShowYesNoModal = function (Ciudad) {
        $scope.CiudadSeleccionada = Ciudad;
        $('#modalConfirmYesNo').modal('show');
    };
})