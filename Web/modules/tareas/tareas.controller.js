(function() {
    'use strict';

    // Create module and controller
    angular
        .module('administradorTareasApp')
        .controller('tareasController', tareasController);


    tareasController.$inject = ["$http", "$stateParams"];

    function tareasController($http, $stateParams) {
      var vm = this;

      selectUser($stateParams.id);

      vm.tareas = [];
      vm.selectedTask = {};
      vm.showForm = false;

      vm.selectTask = selectTask;
      vm.getTaskList = getTaskList;
      vm.showEmptyForm = showEmptyForm;
      vm.searchTasks = searchTasks;
      vm.saveTask = saveTask;
      vm.deleteTask = deleteTask;
      vm.toggleForm = toggleForm;

      vm.getTaskList();

      function selectUser(userId) {
        $http.get("http://localhost:9000/api/users/"+ userId).then(function (result) {
          var usuarios = result.data.usuarios;

          if (usuarios.length === 0)
            vm.selectedUser = {"id": 0, "nombre": "Usuario no encontrado"};
          else if (usuarios.length > 1)
            vm.selectedUser = {"id": 0, "nombre": "Usuario no encontrado"};
          else
            vm.selectedUser = {"id": usuarios[0].id, "nombre": usuarios[0].username};
        },
        function(){
          vm.selectedUser = {"id": 0, "nombre": "Usuario no encontrado"};
        });
      }

      function getTaskList() {
        $http.get("http://localhost:9000/api/users/"+ $stateParams.id + "/tasks").then(function (result) {
          var arrayTareas = [];

          result.data.tasks.forEach(function(tarea) {
            arrayTareas.push({ "title": tarea.title, "id": tarea.id });
          });

          vm.tareas = arrayTareas;
        },
        function() {
          vm.tareas = [];
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

      function toggleForm() {
        vm.showForm = !vm.showForm;
      }

      function searchTasks() {
        $http.get("http://localhost:9000/api/users/"+ $stateParams.id + "/tasks/search/?titulo=" + vm.searchBox).then(function (result) {
          var arrayTareas = [];

          result.data.tasks.forEach(function(tarea) {
            arrayTareas.push({ "title": tarea.title, "id": tarea.id });
          });

          vm.tareas = arrayTareas;
        }, function (error) {
          if (error.status === 404)
            vm.tareas = [];
        });
      }

      function saveTask() {
        var id = vm.selectedTask.id;
        var titulo = vm.selectedTask.title;
        console.log({"id": id, "título": titulo});
        var promise;

        if (!id) {
          promise = $http.put("http://localhost:9000/api/tasks", { "title": titulo, "userId": vm.selectedUser.id });
        }
        else {
          promise = $http.post("http://localhost:9000/api/tasks", { "id": id, "title": titulo, "userId": vm.selectedUser.id });
        }

        promise.then(function(result){
          vm.getTaskList();
          toggleForm();
        });
      }

      function deleteTask() {
        var id = vm.selectedTask.id;

        if (id) {
          $http.delete("http://localhost:9000/api/tasks/" + id).then(function(result){
            vm.getTaskList();
            toggleForm();
          });
        }
        else {
          alert("woooooooops");
        }
      }
    }
})();
