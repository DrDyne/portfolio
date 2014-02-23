'use strict';

angular.module('portfolioApp')
.controller('HeaderCtrl', [
  '$scope',
  'Tracker',
function ($scope, Tracker) {
  $scope.trackContact = function () {
    Tracker.track({action: 'contact-email'});
  }
}]);
