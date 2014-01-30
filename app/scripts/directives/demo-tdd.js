'use strict';

angular.module('portfolioApp')
.directive('demoTdd', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-tdd.html',
    controller: function ($scope, $element) {
      describe('hello jasmine', function () {
        it('should display a success', function () {
          expect(true).toBeTruthy();
        });
      });

      console.log('hello jasmine');
      var jasmineEnv = jasmine.getEnv();
      jasmineEnv.updateInterval = 1000;
      jasmineEnv.addReporter(new jasmine.JSReporter());
      var htmlReporter = new jasmine.HtmlReporter();
      jasmineEnv.addReporter(htmlReporter);
      jasmineEnv.specFilter = function(spec) {
          return htmlReporter.specFilter(spec);
      };
      jasmineEnv.execute();
      var onFinish = jasmineEnv.currentRunner().finishCallback;
      jasmineEnv.currentRunner().finishCallback = function wrapper () {
        onFinish.apply(this, arguments);
        $scope.tests = jasmine.getJSReport();
        var nbSpecs = {
          passing: 0,
          failing: 0,
          skipped: 0,
          total: 0,
        };
        angular.forEach($scope.tests.suites, function (suite) {
          angular.forEach(suite.specs, function (spec) {
            nbSpecs.total += 1;
            if ( spec.skipped ) return nbSpecs.skipped += 1;
            nbSpecs[ spec.passed ? 'passing' : 'failing' ] += 1;
          })
        });
        $scope.nbSpecs = nbSpecs;
      };
    }
  }
}]);
