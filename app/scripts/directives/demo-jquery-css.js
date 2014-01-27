'use strict';

angular.module('portfolioApp')
.directive('demoJqueryCss', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-jquery-css.html',
    controller: function ($scope, $element) {

      $.widget('demo.superHero', {
        options: {
          speed: 500,
          steps: 3,
          target: undefined,
          on: 'click',
        },

        _create: function () {
          this.$el = $(this.options.target);
          this.timer = 0;
          this.bindEvents(this);
        },

        bindEvents: function (self) {
          for ( var event in self.options.trigger ) {
            $(self.options.trigger[event]).bind(event, function () {
              setTimeout(function () { self.animate(self) }, 500);
            });
          }
        },

        animate: function (self) {
          self.$el.attr('hero', this.timer);
          if ( self.timer === 3 ) return self.timer = 0;
          self.timer += 1;
          setTimeout(function () { self.animate(self) }, 500);
        },

        _destroy: function () {
        },
      });

      $('#super-hero').superHero({
        target: '#super-hero',
        trigger: { click: '.text-super-hero' },
      });
    },
  }
}]);
