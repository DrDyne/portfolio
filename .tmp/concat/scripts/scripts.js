'use strict';
angular.module('portfolioApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ngAnimate',
  'colorpicker.module'
]).config(function () {
});
angular.module('portfolioApp').directive('jqSlider', function () {
  //var buttons = {
  //  'prev': '<div class="jq-slide-nav nav-left"><span class="jq-slide-nav-first" rel="first">&#8629;</span><span class="jq-slide-nav-prev">&#8592;</span></div>',
  //  'next': '<div class="jq-slide-nav nav-right"><span class="jq-slide-nav-next">&#8594;</span></div>',
  //};
  return function (scope, element, attrs) {
    element.sudoSlider({
      responsive: true,
      speed: 400,
      customLink: '.jq-slider-link-' + attrs.jqSliderCustomlink + ' .jq-slider-link',
      controlsFade: true,
      prevNext: false
    });
  };
});
angular.module('portfolioApp').directive('scrollTo', [
  '$window',
  function ($window) {
    return {
      restrict: 'AC',
      compile: function () {
        var document = $window.document;
        function scrollInto(id) {
          if (!id)
            return $window.scrollTo(0, 0);
          var el = document.getElementById(id);
          if (el)
            el.scrollIntoView();
        }
        return function (scope, element, attr) {
          element.bind('click', function (event) {
            console.log('scroll to', attr.scrollTo);
            event.preventDefault();
            scrollInto(attr.scrollTo);
          });
        };
      }
    };
  }
]);
angular.module('portfolioApp').directive('scrollFollow', [function () {
    return {
      restrict: 'A',
      link: function ($scope, $element, $attr) {
        setTimeout(function () {
          $element.stickOnScroll({
            footerElement: $($attr.scrollStop),
            topOffset: $attr.scrollTopOffset || 50,
            bottomOffset: $attr.ScrollBottomOffset || 0,
            stickClass: $attr.scrollStickClass || 'sticked-top'
          });
        }, 1000);
      }
    };
  }]);
angular.module('portfolioApp').directive('scrollbarAnnotate', function () {
  return function (scope, element, attrs) {
    setTimeout(function () {
      $(window).sausage({
        classes: 'visible-lg visible-md',
        content: function (i, $page) {
          return '<span class="sausage-span">' + $page.attr('id') + '</span>';
        }
      });
    }, 1000);
  };
});
'use strict';
angular.module('portfolioApp').directive('demoAngular', [function () {
    return {
      restrict: 'A',
      templateUrl: 'views/demo-angular.html',
      controller: [
        '$scope',
        function ($scope) {
          $scope.initColors = function () {
            return [
              '',
              '#a2d39c',
              '#7bcdc8',
              'rgb(110,207,246)',
              'transparent'
            ];
          };
          var getDefinedColors = function () {
            var colors = [];
            angular.forEach($scope.colors, function (color) {
              if (!!color)
                colors.push(color);
            });
            return colors;
          };
          $scope.clearColor = function (index) {
            var colors = getDefinedColors();
            $scope.colors[index] = '';
          };
          $scope.updateGradient = function () {
            var colors = getDefinedColors();
            var style = [];
            if (!colors.length)
              style.push('');
            else {
              if (colors.length === 1)
                style.push('background-color: ' + colors[0] + ';');
              else {
                style.push('background: linear-gradient(left, ' + colors.join(', ') + ') transparent;');
                style.push('background: -webkit-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
                style.push('background: -moz-linear-gradient(left, ' + colors.join(', ') + ') transparent;');
              }
            }
            $scope.gradient = style.join('');
            $scope.gradientDisplay = style;
          };
          $scope.$watch('colors | filter:"!!"', $scope.updateGradient, true);
        }
      ]
    };
  }]);
'use strict';
angular.module('portfolioApp').directive('demoBackbone', [function () {
    return {
      restrict: 'A',
      templateUrl: 'views/demo-backbone.html',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          var Demo = Backbone.View.extend({
              events: {
                'click .blur-o-meter [blur]': 'updateBlur',
                'click .clear-history': 'clearHistory'
              },
              initialize: function (options) {
                var self = this;
                setTimeout(self.render.bind(self), 600);
                this.listenTo(this.model, 'change:blur', this.renderBlur, this);
                this.listenTo(this.model, 'change:blur', this.updateHistory.bind(this, 'success'));
                this.listenTo(this.model, 'invalid', this.updateHistory.bind(this, 'error'));
                this.listenTo(this.collection, 'all', this.renderHistory, this);
              },
              getEl: function () {
                return this.$el.find('#twenty');
              },
              render: function () {
                var $el = this.getEl();
                $el.twentytwenty({ default_offset_pct: 0.1 });
                $el.find('.twentytwenty-overlay').unbind().remove();
                this.renderClearHistoryLink();
              },
              updateBlur: function (event) {
                var value = event.currentTarget.getAttribute('blur');
                this.model.set('blur', value, { validate: true });
              },
              renderBlur: function (value) {
                var $img = this.getEl().find('.right');
                $img.attr('blur', this.model.get('blur'));
              },
              clearHistory: function (event) {
                event.preventDefault();
                this.collection.clear();
              },
              updateHistory: function (type, model, value) {
                var options = {
                    type: type,
                    reason: value,
                    value: value
                  };
                this.collection.addEntry(options);
              },
              renderHistory: function () {
                var $history = this.$el.find('.history');
                $history.html('');
                var template = this.tpl.message;
                _.forEach(this.collection.invoke('message'), function (message) {
                  var el = _.template(template, message);
                  $history.prepend(el);
                });
                this.renderClearHistoryLink();
              },
              renderClearHistoryLink: function () {
                var $clearHistory = this.$el.find('.clear-history');
                $clearHistory[this.collection.isEmpty() ? 'hide' : 'show']();
              },
              tpl: { message: '<li class="text-<%= type %>"><%= content %></li>' }
            });
          var Kitten = Backbone.Model.extend({
              defaults: { blur: 'regular' },
              validate: function (attrs, options) {
                if (!attrs.blur)
                  return 'blur value cannot be empty';
                if (!!(attrs.blur * 1))
                  return 'blur value cannot be a number';
              }
            });
          var History = Backbone.Collection.extend({
              maxSize: 5,
              model: Backbone.Model.extend({
                defaults: {
                  type: undefined,
                  value: undefined,
                  reason: undefined
                },
                isError: function () {
                  return this.get('type') === 'error';
                },
                message: function () {
                  if (this.isError())
                    return {
                      type: 'warning',
                      content: this.get('reason').replace('blur value ', '')
                    };
                  return {
                    type: 'success',
                    content: this.get('value')
                  };
                }
              }),
              addEntry: function (entry) {
                var first;
                if (this.length >= this.maxSize)
                  first = this.shift();
                this.add(entry);
                return first;
              },
              clear: function () {
                this.reset();
              }
            });
          return new Demo({
            el: $element,
            model: new Kitten(),
            collection: new History()
          });
        }
      ]
    };
  }]);
'use strict';
angular.module('portfolioApp').directive('demoJqueryCss', [function () {
    return {
      restrict: 'E',
      templateUrl: 'views/demo-jquery-css.html',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $.widget('demo.superHero', {
            options: {
              speed: 400,
              steps: 3,
              target: undefined,
              preventDefault: true
            },
            _create: function () {
              this.$el = $(this.options.target);
              this.timer = 0;
              this.bindEvents(this);
            },
            bindEvents: function (self) {
              for (var event in self.options.trigger) {
                $(self.options.trigger[event]).bind(event, function (e) {
                  if (self.options.preventDefault)
                    e.preventDefault();
                  setTimeout(function () {
                    self.animate(self);
                  }, self.options.speed);
                });
              }
            },
            animate: function (self) {
              self.$el.attr('hero', this.timer);
              if (self.timer === self.options.steps)
                return self.timer = 0;
              self.timer += 1;
              setTimeout(function () {
                self.animate(self);
              }, self.options.speed);
            },
            _destroy: function () {
            }
          });
          $('#super-hero').superHero({
            target: '#super-hero',
            trigger: { click: '.text-super-hero' }
          });
          $('#switch-button').switchButton({
            width: 50,
            height: 20,
            button_width: 25,
            labels_placement: 'right'
          }).bind('change', function (event) {
            var isChecked = $(event.currentTarget).is(':checked');
            $('.neon-container-well').animate({ 'background-color': !isChecked ? 'transparent' : '#222' }, function () {
              setTimeout(function () {
                $('#neon')[!isChecked ? 'removeClass' : 'addClass']('animate-lights-on');
              }, 500);
            });
          });
        }
      ]
    };
  }]);
'use strict';
angular.module('portfolioApp').directive('demoTdd', [function () {
    return {
      restrict: 'A',
      templateUrl: 'views/demo-tdd.html',
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $scope.hero = {
            name: 'Mario',
            mustache: true
          };
          $scope.quest = {
            reward: 'Princess',
            location: 'Castle'
          };
          $scope.initJasmine = function () {
            var jasmineEnv = jasmine.getEnv();
            jasmineEnv.updateInterval = 0;
            jasmineEnv.addReporter(new jasmine.JSReporter());
            var runner = jasmineEnv.currentRunner();
            var onFinish = runner.finishCallback;
            runner.finishCallback = function wrapper() {
              onFinish.apply(runner, arguments);
              $scope.tests = jasmine.getJSReport();
              //console.log($scope.tests);
              var nbSpecs = {
                  passing: 0,
                  failing: 0,
                  skipped: 0,
                  total: 0
                };
              angular.forEach($scope.tests.suites, function (suite) {
                angular.forEach(suite.specs, function (spec) {
                  nbSpecs.total += 1;
                  if (spec.skipped)
                    return nbSpecs.skipped += 1;
                  nbSpecs[spec.passed ? 'passing' : 'failing'] += 1;
                });
              });
              $scope.nbSpecs = nbSpecs;
            };
            jasmineEnv.execute();
          };
          var Subject = function (scope) {
            this.hero = {
              mustache: scope.hero.mustache,
              name: scope.hero.name.toLowerCase()
            };
            this.quest = {
              reward: scope.quest.reward.toLowerCase(),
              location: scope.quest.location.toLowerCase()
            };  //console.log(scope, this);
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
        }
      ]
    };
  }]).directive('jasmineSuite', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: { suite: '=' },
      templateUrl: 'views/demo-tdd-suite.html',
      link: function ($scope, $element) {
        if (angular.isArray($scope.suite.suites)) {
          $element.append('<jasmine-suite suite=\'suite.suites\'></jasmine-suite>');
          $compile($element.contents())($scope);
        }
      }
    };
  }]).directive('jasmineSpec', [function () {
    return {
      restrict: 'E',
      replace: true,
      scope: { spec: '=' },
      templateUrl: 'views/demo-tdd-spec.html'
    };
  }]);
'use strict';
angular.module('portfolioApp').controller('MainCtrl', [
  '$scope',
  function ($scope) {
    $scope.sections = [
      {
        id: 'me',
        currentSlide: '',
        slides: []
      },
      {
        id: 'employments',
        slides: [
          'silanis',
          'babel',
          'lg',
          'eurocopter'
        ]
      },
      {
        id: 'demo',
        slides: [
          'angular',
          'backbone',
          'jquery-css',
          'tdd'
        ]
      },
      {
        id: 'tools',
        slides: [
          'vim',
          'byobu',
          'git'
        ]
      },
      {
        id: 'education',
        slides: [
          'master',
          'license',
          'bts'
        ]
      },
      {
        id: 'skills',
        slides: ['api']
      },
      { id: 'languages' },
      {
        id: 'activities',
        slides: [
          'confoo',
          'workshop-microsoft',
          'workshop-coaching',
          'gamerella',
          'js-montreal',
          'html5-montreal',
          'symphony-montreal',
          'toeic'
        ]
      },
      { id: 'contact' },
      { id: 'you' }
    ];
  }
]);