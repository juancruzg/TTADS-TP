var app = angular.module('administradorTareasApp', ['ui.router']);

app.config(function($stateProvider) {
  var users = {
      name: "users",
      templateUrl: './modules/usuarios/usuarios.html',
      url:"/users",
      controller: 'usuariosController',
      controllerAs: 'userVm'
  }

  var tasks = {
      name: "tasks",
      templateUrl: './modules/tareas/tareas.html',
      url:"/tasks/:id",
      controller: 'tareasController',
      controllerAs: 'taskVm'
  }

  $stateProvider.state(users).state(tasks);
});
