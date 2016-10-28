'use strict';

angular.module('angularExpressApp').controller('MainCtrl', function ($scope, $http) {
  $scope.awesomeThings = [];

  $http.get('/api/things').success(function (awesomeThings) {
    $scope.awesomeThings = awesomeThings;
  });
});
//# sourceMappingURL=main.controller.js.map
