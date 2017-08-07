var app = angular.module("myApp", []);
app.controller("myCtrl", function ($scope, $http) {
    //debugger;
    $scope.Add = function () {
        var Action = document.getElementById("btnSave").getAttribute("value");
        if (Action == "Agregar") {
            $scope.Pais = {};
            $scope.Pais.pai_codigo = $scope.CodigoPais;
            $scope.Pais.pai_nombre = $scope.NombrePais;
            $http({
                method: "post",
                url: "/Pais/Insert",
                datatype: "json",
                data: JSON.stringify($scope.Pais)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAll();
                $scope.CodigoPais = "";
                $scope.NombrePais = "";
            })
        } else {
            $scope.Pais = {};
            $scope.Pais.pai_codigo = $scope.CodigoPais;
            $scope.Pais.pai_nombre = $scope.NombrePais;
            $http({
                method: "post",
                url: "/Pais/Update",
                datatype: "json",
                data: JSON.stringify($scope.Pais)
            }).then(function (response) {
                alert(response.data);
                $scope.GetAll();
                $scope.CodigoPais = "";
                $scope.NombrePais = "";
                document.getElementById("btnSave").setAttribute("value", "Agregar");
            })
        }
    };

    $scope.GetAll = function () {
        //debugger;
        $http({
            method: "get",
            url: "/Pais/GetAll"
        }).then(function (response) {
            //console.log(response);
            $scope.paises = response.data;
        }).catch(function (reason) {
            console.log(reason);
            alert("Ocurrió un error al intentar obtener los países");
        })
    };

    $scope.Delete = function (Pais) {
        $http({
            method: "post",
            url: "/Pais/Delete",
            datatype: "json",
            data: JSON.stringify(Pais)
        }).then(function (response) {
            alert(response.data);
            $scope.GetAll();
        })
    };

    $scope.Get = function (Pais) {
        //console.log(Pais);
        $scope.CodigoPais = Pais.pai_codigo;
        $('#inputCodigo').prop('readonly', true);
        $scope.NombrePais = Pais.pai_nombre;
        document.getElementById("btnSave").setAttribute("value", "Actualizar");
        $('#myModal').modal('show');
    }
})

//esconde el modal cuando se hace click en el botón cerrar o en la cruz.
function dismissModal() {
    $('#myModal').modal('hide');
}

//limpia los textbox.
function clearTextBox() {
    //console.log("llegue!!");
    $('#inputCodigo').val("");
    $('#inputCodigo').prop('readonly', false);
    $('#inputNombre').val("");
    document.getElementById("btnSave").setAttribute("value", "Agregar");
}