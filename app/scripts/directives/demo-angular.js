'use strict';

angular.module('portfolioApp')
.directive('demoAngular', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-angular.html',
    controller: function ($scope) {
      $scope.initColors = function () { return ['', '#a2d39c', '#7bcdc8', 'rgb(110,207,246)', 'transparent'] }

      var getDefinedColors = function () {
        var colors = [];
        angular.forEach($scope.colors, function (color) { if ( !!color ) colors.push(color) });
        return colors;
      };

      $scope.clearColor = function (index) {
        var colors = getDefinedColors();
        $scope.colors[index] = '';
      };

      $scope.updateGradient = function () {
        var colors = getDefinedColors();
        var style = [];

        if ( !colors.length ) style.push('');
        else {
          if ( colors.length === 1 ) style.push('background-color: ' + colors[0] + ';');
          else {
            style.push('background: linear-gradient(left, ' + colors.join(', ') + ') transparent;');
            style.push('background: -webkit-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
            style.push('background: -moz-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
          }
        }

        $scope.gradient = style.join('');
        $scope.gradientDisplay = style;
      };

      $scope.$watch('colors | filter:"!!"', $scope.updateGradient, true);
    }
  }
}]);
