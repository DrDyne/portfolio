angular.module('portfolioApp')
.factory('Tracker', [function () {
  return {
    track: function (options) {
      console.log(options);
      clicky.log(options.url || '/', options.action, options.type || 'click');
    }
  }
}]);
