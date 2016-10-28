'use strict';

angular.module('angularExpressApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ui.router', 'ui.bootstrap']).config(function ($stateProvider, $urlRouterProvider, $locationProvider) {
  $urlRouterProvider.otherwise('/');

  $locationProvider.html5Mode(true);
});
//# sourceMappingURL=app.js.map
