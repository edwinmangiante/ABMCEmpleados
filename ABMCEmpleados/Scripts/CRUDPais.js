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
                        if (data.existe == false) {
                            $scope.Pais = {};
                            $scope.Pais.pai_codigo = $scope.CodigoPais.toUpperCase();
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
                var pai_codigo = $scope.CodigoPais.toUpperCase();
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
                            $scope.Pais.pai_codigo = $scope.CodigoPais.toUpperCase();
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
        var search = $scope.searchNombre;
        $http({
            method: "GET",
            url: "/Pais/GetAll",
            params: ({ filterNombre: search })
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
                alert(response.data);
                $scope.GetAll();
            }).catch(function (reason) {
                console.log(reason);
                alert("Ocurrió un error al intentar exportar a excel los países.");
            })
        } else {
            alert('No hay registros para exportar a excel');
        }
    };

    //función para validar que los campos esten completos
    $scope.Validate = function () {
        //debugger;
        var isValid = true;
        var a = "";
        if ($('#inputCodigo').val().trim() == "" || $scope.CodigoPais == '') {
            alert("Debe completar el código de país.");
            isValid = false;
        }
        if ($('#inputNombre').val().trim() == "" || $scope.NombrePais == '') {
            alert("Debe completar el nombre del país.");
            isValid = false;
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
    }
})