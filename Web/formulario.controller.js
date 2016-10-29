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

        var promise;

        if (!id) {
          promise = $http.put("http://localhost:9000/api/users", { "nombre": nombre });
        }
        else {
          promise = $http.post("http://localhost:9000/api/users", { "id": id, "nombre": nombre });
        }

        promise.then(function(result){
          vm.updateTable();
          vm.cancelUser();
          vm.showForm = false;
        });
      }

      function deleteUser() {
        var id = vm.usuario.id;

        if (id) {
          $http.delete("http://localhost:9000/api/users/" + id).then(function(result){
            vm.updateTable();
            vm.cancelUser();
            vm.showForm = false;
          });
        }
        else {
          alert("woooooooops");
        }
      }

      function cancelUser() {
        vm.usuario = {};
        vm.showForm = false;
      }
    }
})();
