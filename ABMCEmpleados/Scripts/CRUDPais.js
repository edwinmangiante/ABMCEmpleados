var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
    //debugger;
    $scope.Add = function () {
        var isValid = $scope.Validate();

        if (isValid == true) {
            var Action = $("#btnSave").val();
            if (Action == "Agregar") {
                var pai_codigo = $scope.CodigoPais.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Pais/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pai_codigo }),
                    success: function (data) {
                        if (data.existe == 1) {
                            $scope.Pais = {};
                            $scope.Pais.pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Pais.pai_nombre = $scope.NombrePais;
                            $http({
                                method: "POST",
                                url: "/Pais/Insert",
                                datatype: "json",
                                data: JSON.stringify($scope.Pais)
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
                                        $scope.title = "Agregado!";
                                        $scope.msg = "Se agregó el país satisfactoriamente.";
                                    } else if (response.data.rta == 1) {
                                        $scope.title = "Error!";
                                        $scope.msg = "No se pudo agregar el país, intente nuevamente.";
                                    }
                                    $scope.GetAll();
                                    $scope.CodigoPais = "";
                                    $scope.NombrePais = "";
                                }
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de país ingresado ya existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            if (data.existe == 0) {
                                $scope.msg = "El código de país ingresado ya existe.";
                            } else if (data.existe == 2) {
                                $scope.msg = "El código de país es nulo.";
                            } else if (data.existe == -1) {
                                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                window.location.href = "/Ingresar/Index";
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        //alert("Ocurrió un error al intentar verificar el código de país.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de país.";
                    }
                })
            } else {
                var pai_codigo = $scope.CodigoPais.toUpperCase();
                $.ajax({
                    type: "GET",
                    url: "/Pais/GetByKey",
                    contentType: "application/json;charset=UTF-8",
                    dataType: "json",
                    data: ({ codigoPais: pai_codigo }),
                    success: function (data) {
                        if (data.existe == 0) {
                            $scope.Pais = {};
                            $scope.Pais.pai_codigo = $scope.CodigoPais.toUpperCase();
                            $scope.Pais.pai_nombre = $scope.NombrePais;
                            $http({
                                method: "POST",
                                url: "/Pais/Update",
                                datatype: "json",
                                data: JSON.stringify($scope.Pais)
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
                                        $scope.msg = "Se actualizó el país satisfactoriamente.";
                                    } else if (response.data.rta == 1) {
                                        $scope.title = "Error!";
                                        $scope.msg = "No se pudo actualizar el país, intente nuevamente.";
                                    }
                                    $scope.GetAll();
                                    $scope.CodigoPais = "";
                                    $scope.NombrePais = "";
                                    $("#btnSave").attr("value", "Agregar");
                                    $('#myModal').modal('hide');
                                }
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de país ingresado no existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            if (data.existe == 1) {
                                $scope.msg = "El código de país ingresado no existe.";
                            } else if (data.existe == 2) {
                                $scope.msg = "El código de país es nulo.";
                            } else if (data.existe == -1) {
                                $scope.msg = "El usuario, e-mail o contraseña son incorrectos.";
                                window.location.href = "/Ingresar/Index";
                            }
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        //alert("Ocurrió un error al intentar verificar el código de país.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de país.";
                    }
                })
            }
        }
    };

    $scope.GetAll = function () {
        //debugger;
        var search = $scope.searchNombre;
        $http({
            method: "GET",
            url: "/Pais/GetAll",
            params: ({ filterNombre: search })
        }).then(function (response) {
            //console.log(response);
            $scope.loading = false;
            if (response.data != null) {
                $scope.paises = response.data;
            } else {
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
    };

    $scope.Delete = function () {
        //debugger;
        var Action = $("#btnYesNo").val();
        if (Action == "Si") {
            $http({
                method: "POST",
                url: "/Pais/Delete",
                datatype: "json",
                data: JSON.stringify($scope.PaisSeleccionado)
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
                        $scope.msg = "Se eliminó el país satisfactoriamente.";
                    } else if (response.data.rta == 1) {
                        $scope.title = "Error!";
                        $scope.msg = "El país que quiere eliminar posee al menos una provincia cargada. Elimine la/s provincia/s y luego elimine el país.";
                    } else if (response.data.rta == 2) {
                        $scope.title = "Error!";
                        $scope.msg = "No se pudo eliminar el país, intente nuevamente.";
                    }
                    $scope.GetAll();
                }
            })
        }
    };

    $scope.Get = function (Pais) {
        $scope.CodigoPais = Pais.pai_codigo.toUpperCase();
        $('#inputCodigo').prop('readonly', true);
        $scope.NombrePais = Pais.pai_nombre;
        $("#btnSave").attr("value", "Actualizar");
        $('#myModal').modal('show');
        $scope.loading = false;
    };

    //exporta los elemetos que se estan mostrando en la grilla a excel.
    $scope.Export = function () {
        if ($scope.paises != null && $scope.paises.length > 0) {
            //exporta directamente desde angular, funciona. (No se le puede dar ningún formato, por eso voy al C#)
            //alasql('SELECT * INTO XLSX("paises.xlsx",{headers:true}) FROM ?', [$scope.paises]);
            $http({
                method: "POST",
                url: "/Pais/ExportToExcel",
                datatype: "json",
                data: JSON.stringify($scope.paises)
            }).then(function (response) {
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
                    $scope.GetAll();
                }
            }).catch(function (reason) {
                console.log(reason);
                //alert("Ocurrió un error al intentar exportar a excel los países.");
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Ocurrió un error al intentar exportar a excel los países.";
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
        //debugger;
        var isValid = true;
        if ($('#inputCodigo').val().trim() == "" || $scope.CodigoPais == '') {
            //alert("Debe completar el código de país.");
            isValid = false;
        }

        if (isValid) {
            if ($('#inputNombre').val().trim() == "" || $scope.NombrePais == '') {
                //alert("Debe completar el nombre del país.");
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el nombre del país.";
                isValid = false;
            }
        } else {
            if ($('#inputNombre').val().trim() == "" || $scope.NombrePais == '') {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código y el nombre del país.";
            } else {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código de país.";
            }
        }

        return isValid;
    };

    //limpia los textbox.
    $scope.ClearTextBox = function () {
        //debugger;
        $('#inputCodigo').val("");
        $('#inputCodigo').prop('readonly', false);
        $scope.CodigoPais = "";
        $('#inputNombre').val("");
        $scope.NombrePais = "";
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

    $scope.ShowYesNoModal = function (Pais) {
        $scope.PaisSeleccionado = Pais;
        $('#modalConfirmYesNo').modal('show');
    };
})