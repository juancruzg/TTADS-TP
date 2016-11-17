var app = angular.module('administradorTareasApp', ['ngRoute']);
app.config(['$routeProvider','$urlRouterProvider',function($routeProvider, $urlRouterProvider) {
  //$urlRouterProvider.otherwise('/index');

  //$stateProvider.state('index', {
  //    url: '/',
  //    templateUrl: 'index.html'
  //})
  $routeProvider.when('users', {
        //url: '/users',
        //templateUrl: '/modules/usuarios/usuarios.html',
        template: '</br></br></br></br></br></br><h1>HOLAAAAAAAAAAAAAAAA mundo</h1>',
        controller: 'usuariosController',
        controllerAs: 'userVm'
  });
}]);
