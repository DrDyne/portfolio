'use strict';

angular.module('portfolioApp')
.controller('DemoAngularCtrl', [
  '$scope',
function ($scope) {
  $scope.initColors = function () { return ['#ffe600', 'rgba(255,230,0,0.5)', 'transparent', 'rgba(255,127,127,0.5)', 'red'] }

  $scope.updateGradient = function (colors) {
    var gradient = [];
    angular.forEach($scope.colors, function (value, index) { gradient.push(value) });

    $scope.gradient = {
      background: '-webkit-linear-gradient(left, ' + gradient.join(', ') + ') transparent',
    };
  };

  $scope.addHandle = function () {
    if ( $scope.handles.length === 5 ) return;
    var color = randomColor();
    $scope.handles.push(randomColor());
  };

  $scope.removeHandle = function () {
    $scope.handles.pop();
  };

  $scope.$watch('colors', $scope.updateGradient, true);
}]);
