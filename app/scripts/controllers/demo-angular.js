'use strict';

angular.module('portfolioApp')
.controller('DemoAngularCtrl', [
  '$scope',
function ($scope) {
  var randomColor = function () { return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6); }

  $scope.updateGradient = function (colors) {
    var gradient = [];
    angular.forEach($scope.colors, function (value, index) { gradient.push(value) });
    console.log('$scope.colors', $scope.colors, $scope.colors.join(', '));

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
