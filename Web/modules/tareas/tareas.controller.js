(function() {
    'use strict';

    // Create module and controller
    angular
        .module('administradorTareasApp')
        .controller('tareasController',tareasController);


    tareasController.$inject = ["$http"];

    function tareasController($http) {
      var vm = this;

      vm.tareas = [];
      vm.selectedTask = {};
      vm.showForm = false;

      vm.selectTask = selectTask;
      vm.getTaskList = getTaskList;
      vm.showEmptyForm = showEmptyForm;
      vm.searchTasks = searchTasks;
      vm.saveTask = saveTask;
      vm.deleteTask = deleteTask;

      vm.getTaskList();

      function getTaskList() {
        $http.get("http://localhost:9000/api/users/"+ 1 + "/tasks").then(function (result) {
          var arrayTareas = [];

          result.data.usuarios.forEach(function(tarea) {
            arrayTareas.push({ "title": tarea.title, "id": tarea.id });
          });

          vm.tareas = arrayTareas;
        });
      }

      function selectTask(task) {
        vm.selectedTask = { "id": task.id, "title": task.title };
        vm.showForm = true;
      }

      function showEmptyForm() {
        vm.showForm = true;
        vm.selectedTask = {};
      }

      function searchTasks() {
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

      function saveTask() {
        var id = vm.tarea.id;
        var titulo = vm.tarea.titulo;

        var promise;

        if (!id) {
          promise = $http.put("http://localhost:9000/api/tasks", { "title": titulo, "userId": vm.selectedUser.id });
        }
        else {
          promise = $http.post("http://localhost:9000/api/tasks", { "id": id, "title": titulo, "userId": vm.selectedUser.id });
        }

        promise.then(function(result){
          vm.getTaskList();
          vm.showForm = false;
        });
      }

      function deleteTask() {
        var id = vm.tarea.id;

        if (id) {
          $http.delete("http://localhost:9000/api/tasks/" + id).then(function(result){
            vm.getTaskList();
            vm.showForm = false;
          });
        }
        else {
          alert("woooooooops");
        }
      }
    }
})();
