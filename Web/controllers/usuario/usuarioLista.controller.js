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
      vm.showForm = false;

      vm.selectUser = selectUser;
      vm.getUserList = getUserList;
      vm.showEmptyForm = showEmptyForm;
      vm.searchUsers = searchUsers;

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
        vm.showForm = true;
      }

      function showEmptyForm() {
        vm.showForm = true;
        vm.selectedUser = {};
      }

      function searchUsers() {
        $http.get("http://localhost:9000/api/users/search/?nombre=" + vm.searchBox).then(function (result) {
          var arrayUsuarios = [];

          result.data.usuarios.forEach(function(usuario) {
            arrayUsuarios.push({ "username": usuario.username, "id": usuario.id });
          });

          vm.usuarios = arrayUsuarios;
        }, function (error) {
          if (error.status === 404)
            vm.usuarios = [];
        });
      }
    }
})();
