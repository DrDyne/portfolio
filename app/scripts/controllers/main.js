'use strict';

angular.module('portfolioApp')
.controller('MainCtrl', [
  '$scope',
  'Tracker',
function ($scope, Tracker) {
  $scope.track = function (action) {
    Tracker.track({action: action});
  }
}]);
