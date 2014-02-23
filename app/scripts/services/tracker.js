angular.module('portfolioApp')
.factory('Tracker', [function () {
  return {
    track: function (options) {
      clicky.log(options.url || '/', options.action);
    }
  }
}]);
