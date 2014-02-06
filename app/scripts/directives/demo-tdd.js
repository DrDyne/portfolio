'use strict';

angular.module('portfolioApp')
.directive('demoTdd', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-tdd.html',
    controller: function ($scope, $element) {

      $scope.hero = {
        name: 'Mario',
        mustache: true,
      };

      $scope.quest = {
        reward: 'Princess',
        location: 'Castle',
      };

      $scope.initJasmine = function () {
        var jasmineEnv = jasmine.getEnv();
        jasmineEnv.updateInterval = 0;
        jasmineEnv.addReporter(new jasmine.JSReporter());

        var runner = jasmineEnv.currentRunner();
        var onFinish = runner.finishCallback;

        runner.finishCallback = function wrapper () {
          onFinish.apply(runner, arguments);
          $scope.tests = jasmine.getJSReport();
          //console.log($scope.tests);
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
        }

        jasmineEnv.execute();
      };

      var Subject = function (scope) {
        this.hero = {
          mustache: scope.hero.mustache,
          name: scope.hero.name.toLowerCase()
        };
        this.quest = {
          reward: scope.quest.reward.toLowerCase(),
          location: scope.quest.location.toLowerCase(),
        };
        //console.log(scope, this);
      };

      describe('Hero', function () {
        it('should have a mustache', function () {
          var subject = new Subject($scope);
          expect(subject.hero.mustache).toBeTruthy();
        });

        it('should be named Mario', function () {
          var subject = new Subject($scope);
          expect(subject.hero.name).toEqual('mario');
        });
      });

      describe('Quest', function () {
        describe('Reward', function () {
          it('should be a Princess', function () {
            var subject = new Subject($scope);
            expect(subject.quest.reward).toEqual('princess');
          });
        });
        describe('Location', function () {
          it('should be in another castle', function () {
            var subject = new Subject($scope);
            expect(subject.quest.location).toEqual('castle');
          });
        });
      });

    },
  }
}])
.directive('jasmineSuite', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      suite: '=',
    },
    templateUrl: 'views/demo-tdd-suite.html',
    link: function ($scope, $element) {
     if ( angular.isArray($scope.suite.suites) ) {
       $element.append("<jasmine-suite suite='suite.suites'></jasmine-suite>");
       $compile($element.contents())($scope)
     }
    },
  }
}])
.directive('jasmineSpec', [function () {
  return {
    restrict: 'E',
    replace: true,
    scope: {
      spec: '=',
    },
    templateUrl: 'views/demo-tdd-spec.html',
  }
}]);
