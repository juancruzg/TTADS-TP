angular
  .module('administradorTareasApp')
  .directive('formulario', formularioDirective);
    function formularioDirective(){
        return{
            restrict: 'E',
            templateUrl: 'formulario.html',
            scope:{
              usuario: "=",
              updateTable: "&"
            },
            bindToController: true,
            controller: 'formularioController',
            controllerAs: 'formularioVm'
        };
    }
