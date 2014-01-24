'use strict';

angular.module('portfolioApp')
.directive('demoAngular', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-angular.html',
  }
}]);
