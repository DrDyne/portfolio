'use strict';

angular.module('portfolioApp')
.controller('DemoAngularCtrl', [
  '$scope',
function ($scope) {
  $scope.initColors = function () { return ['#a2d39c', '#a2d39c', '#7bcdc8', 'rgb(110,207,246)', 'transparent'] }

  $scope.updateGradient = function (colors) {

    var style = [];
    style.push('background: linear-gradient(left, ' + $scope.colors.join(', ') + ') transparent');
    style.push('background: -webkit-linear-gradient(left, ' + $scope.colors.join(', ') + ') transparent');
    style.push('background: -moz-linear-gradient(left, ' + $scope.colors.join(', ') + ') transparent');
    style.push('background: -o-linear-gradient(left, ' + $scope.colors.join(', ') + ') transparent');
    $scope.gradient = style.join(';');
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
