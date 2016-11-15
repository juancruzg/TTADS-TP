angular
  .module('administradorTareasApp')
  .directive('formulario', formularioDirective);
    function formularioDirective(){
        return{
            restrict: 'E',
            templateUrl: 'controllers/usuario/formUsuario.html',
            scope:{
              usuario: "=",
              showForm: "=",
              updateTable: "&"
            },
            bindToController: true,
            controller: 'formularioController',
            controllerAs: 'formularioVm'
        };
    }
