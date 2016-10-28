(function() {
    'use strict';

    // Create module and controller
    angular
        .module('administradorTareasApp', [])
        .controller('usuariosController',usuariosController);


    usuariosController.$inject = ["$http"];

    function usuariosController($http) {
      var vm = this;

      vm.usuarios = [];
      vm.selectedUser = {};

      vm.selectUser = selectUser;
      vm.getUserList = getUserList;

      vm.getUserList();

      function getUserList() {
        $http.get("http://localhost:9000/api/users").then(function (result) {
          var arrayUsuarios = [];

          result.data.usuarios.forEach(function(usuario) {
            arrayUsuarios.push({ "username": usuario.username, "id": usuario.id });
          });

          vm.usuarios = arrayUsuarios;
        });
      }

      function selectUser(user) {
        vm.selectedUser = { "id": user.id, "nombre": user.username };
      }
    }
})();
