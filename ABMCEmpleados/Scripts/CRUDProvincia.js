var app = angular.module("myApp", ['angularUtils.directives.dirPagination']);
app.controller("myCtrl", function ($scope, $http) {
    $scope.loading = true;
    //debugger;
    $http({
        method: 'GET',
        url: '/Provincia/GetPaises'
    }).then(function (response) {
        $scope.paises = response.data;
        $scope.currentPais = $scope.paises[0].pai_codigo;
        $scope.GetAllByPais($scope.paises[0].pai_codigo);
    }).catch(function (reason) {
        $scope.loading = false;
        console.log(reason);
        //alert("Ocurrió un error al intentar obtener los países.");
        $("#alertModal").modal('show');
        $scope.title = "Error!";
        $scope.msg = "Ocurrió un error al intentar obtener los países.";
    })

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
                                //alert(response.data);
                                $("#alertModal").modal('show');
                                if (response.data.rta == 0) {
                                    $scope.title = "Agregada!";
                                    $scope.msg = "Se agregó la provincia satisfactoriamente.";
                                } else if (response.data.rta == 1) {
                                    $scope.title = "Error!";
                                    $scope.msg = "No se pudo agregar la provincia, intente nuevamente.";
                                }
                                $scope.GetAllByPais($scope.currentPais);
                                $scope.Provincia.pro_pai_codigo = "";
                                $scope.Provincia.pro_codigo = "";
                                $scope.Provincia.pro_nombre = "";
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de provincia ingresado ya existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            $scope.msg = "El código de provincia ingresado ya existe.";
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        //alert("Ocurrió un error al intentar verificar el código de provincia.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de provincia.";
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
                                //alert(response.data);
                                $("#alertModal").modal('show');
                                if (response.data.rta == 0) {
                                    $scope.title = "Actualizado!";
                                    $scope.msg = "Se actualizó la provincia satisfactoriamente.";
                                } else if (response.data.rta == 1) {
                                    $scope.title = "Error!";
                                    $scope.msg = "No se pudo actualizar la provincia, intente nuevamente.";
                                }
                                $scope.GetAllByPais($scope.currentPais);
                                $scope.Provincia.pro_pai_codigo = "";
                                $scope.Provincia.pro_codigo = "";
                                $scope.Provincia.pro_nombre = "";
                                $("#btnSave").attr("value", "Agregar");
                                $('#myModal').modal('hide');
                            })
                        } else {
                            $scope.loading = false;
                            //alert("El código de provincia ingresado no existe.");
                            $("#alertModal").modal('show');
                            $scope.title = "Verifique!";
                            $scope.msg = "El código de provincia ingresado no existe.";
                        }
                    },
                    error: function (xhr, status, error) {
                        $scope.loading = false;
                        console.log(xhr);
                        console.log(status);
                        console.log(error);
                        a = xhr.responseText;
                        //alert("Ocurrió un error al intentar verificar el código de provincia.");
                        $("#alertModal").modal('show');
                        $scope.title = "Error!";
                        $scope.msg = "Ocurrió un error al intentar verificar el código de provincia.";
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
            $scope.loading = false;
            $scope.provincias = response.data;
        }).catch(function (reason) {
            $scope.loading = false;
            console.log(reason);
            //alert("Ocurrió un error al intentar obtener las provincias.");
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "Ocurrió un error al intentar obtener las provincias.";
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
            //alert("Ocurrió un error al intentar obtener las provincias por país.");
            $("#alertModal").modal('show');
            $scope.title = "Error!";
            $scope.msg = "Ocurrió un error al intentar obtener las provincias por país.";
        })
    };

    $scope.Delete = function () {
        var Action = $("#btnYesNo").val();
        if (Action == "Si") {
            $http({
                method: "POST",
                url: "/Provincia/Delete",
                datatype: "json",
                data: JSON.stringify($scope.ProvinciaSeleccionada)
            }).then(function (response) {
                //alert(response.data);
                $('#modalConfirmYesNo').modal('hide');
                $("#alertModal").modal('show');
                if (response.data.rta == 0) {
                    $scope.title = "Eliminado!";
                    $scope.msg = "Se eliminó la provincia satisfactoriamente.";
                } else if (response.data.rta == 1) {
                    $scope.title = "Error!";
                    $scope.msg = "La provincia que quiere eliminar posee al menos una ciudad cargada. Elimine la/s ciudad/es y luego elimine la provincia.";
                } else if (response.data.rta == 2) {
                    $scope.title = "Error!";
                    $scope.msg = "No se pudo eliminar la provincia, intente nuevamente.";
                }
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
    };

    //exporta los elemetos que se estan mostrando en la grilla a excel.
    $scope.Export = function () {
        if ($scope.provincias != null && $scope.provincias.length > 0) {
            //exporta directamente desde angular, funciona. (No se le puede dar ningún formato, por eso voy al C#)
            //alasql('SELECT * INTO XLSX("provincias.xlsx",{headers:true}) FROM ?', [$scope.provincias]);
            $http({
                method: "POST",
                url: "/Provincia/ExportToExcel",
                datatype: "json",
                data: JSON.stringify($scope.provincias)
            }).then(function (response) {
                //alert(response.data);
                $("#alertModal").modal('show');
                if (response.data.rta == 0) {
                    $scope.title = "Exportado!";
                    $scope.msg = "Se creó el excel correctamente en el directorio " + response.data.dir + ".";
                } else if (response.data.rta == 1) {
                    $scope.title = "Error!";
                    $scope.msg = "Ocurrió un error al intentar crear el excel, intente nuevamente. (" + response.data.exMsg + ")";
                }
                $scope.GetAllByPais($scope.currentPais);
            }).catch(function (reason) {
                console.log(reason);
                //alert("Ocurrió un error al intentar exportar a excel los países.");
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Ocurrió un error al intentar exportar a excel las provincias.";
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
            alert("Debe completar el código del país de la provincia.");
            isValid = false;
        }*/

        if ($('#inputCodigo').val().trim() == "" || $scope.CodigoProvincia == "") {
            //alert("Debe completar el código de provincia.");
            isValid = false;
        }
        if (isValid) {
            if ($('#inputNombre').val().trim() == "" || $scope.NombreProvincia == "") {
                //alert("Debe completar el nombre de la provincia.");
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el nombre de la provincia.";
                isValid = false;
            }
        } else {
            if ($('#inputNombre').val().trim() == "" || $scope.NombreProvincia == '') {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código y el nombre de la provincia.";
            } else {
                $("#alertModal").modal('show');
                $scope.title = "Error!";
                $scope.msg = "Debe completar el código de la provincia.";
            }
        }

        return isValid;
    };

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
    };

    $scope.HideAlertModal = function () {
        $('#alertModal').modal('hide');
    };

    $scope.HideYesNoModal = function () {
        $('#modalConfirmYesNo').modal('hide');
    };

    $scope.ShowYesNoModal = function (Provincia) {
        $scope.ProvinciaSeleccionada = Provincia;
        $('#modalConfirmYesNo').modal('show');
    };
})