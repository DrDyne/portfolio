'use strict';

angular.module('portfolioApp')
.controller('DemoAngularCtrl', [
  '$scope',
function ($scope) {
  $scope.initHandles = function () {
    return [ 
      'rgba(0,0,0,1)',
      'rgba(255,255,255,1)',
    ]
  };

  $scope.updateGradient = function (colors) {

    $scope.gradient = {
      background: '-webkit-linear-gradient(left, ' + $scope.handles.join(', ') + ') transparent',
      'border-left': '40px solid ' + $scope.handles[0],
      'border-right': '40px solid ' + $scope.handles[$scope.handles.length - 1],
    };

    console.log($scope.gradient);
  };

  $scope.handles = $scope.initHandles();

  $scope.addHandle = function () {
    if ( $scope.handles.length === 9 ) return;
    $scope.handles.push('#888');
  };

  $scope.removeHandle = function () {
    $scope.handles.pop();
  };

  $scope.$watchCollection('handles', $scope.updateGradient);

}]);
