'use strict';

angular.module('portfolioApp')
.controller('DemoAngularCtrl', [
  '$scope',
function ($scope) {
  $scope.initColors = function () { return ['', '#a2d39c', '#7bcdc8', 'rgb(110,207,246)', 'transparent'] }

  var getDefinedColors = function () {
    var colors = [];
    angular.forEach($scope.colors, function (color) { if ( !!color ) colors.push(color) });
    return colors;
  };

  $scope.clearColor = function (index) {
    var colors = getDefinedColors();
    if ( colors.length < 3 ) return;
    $scope.colors[index] = '';
  };

  $scope.updateGradient = function () {
    var colors = getDefinedColors();

    var style = [];
    style.push('background: linear-gradient(left, ' + colors.join(', ') + ') transparent;');
    style.push('background: -webkit-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
    style.push('background: -moz-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
    style.push('background: -o-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
    $scope.gradient = style.join('');
    $scope.gradientDisplay = style;
    $scope.definedColors = colors.length;
  };

  $scope.addHandle = function () {
    if ( $scope.handles.length === 5 ) return;
    var color = randomColor();
    $scope.handles.push(randomColor());
  };

  $scope.removeHandle = function () {
    $scope.handles.pop();
  };

  $scope.$watch('colors | filter:"!!"', $scope.updateGradient, true);
}]);
