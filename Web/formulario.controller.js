(function() {
    'use strict';

    // Create module and controller
    angular
        .module('administradorTareasApp')
        .controller('formularioController', formularioController);

    formularioController.$inject = ["$http"];

    function formularioController($http) {
      var vm = this;

      vm.saveUser = saveUser;
      vm.deleteUser = deleteUser;
      vm.cancelUser = cancelUser;

      function saveUser()  {
        var id = vm.usuario.id;
        var nombre = vm.usuario.nombre;

        if (!id) {
          $http.put("http://localhost:9000/api/users", { "nombre": nombre }).then(function(result){
            vm.updateTable();
          });
        }
        else {
          $http.post("http://localhost:9000/api/users", { "id": id, "nombre": nombre }).then(function(result){
            vm.updateTable();
          });
        }
      }

      function deleteUser() {
        var id = vm.usuario.id;

        if (id) {
          $http.delete("http://localhost:9000/api/users/" + id).then(function(result){
            vm.updateTable();
          });
        }
      }

      function cancelUser() {
        vm.usuario.id = null;
        vm.usuario.nombre = null;
      }
    }
})();
