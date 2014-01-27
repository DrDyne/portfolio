'use strict';

angular.module('portfolioApp')
.directive('demoJqueryCss', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-jquery-css.html',
    controller: function ($scope, $element) {
      $.widget('demo.superHero', {
        options: {
          speed: 400,
          steps: 3,
          target: undefined,
        },

        _create: function () {
          this.$el = $(this.options.target);
          this.timer = 0;
          this.bindEvents(this);
        },

        bindEvents: function (self) {
          for ( var event in self.options.trigger ) {
            $(self.options.trigger[event]).bind(event, function () {
              setTimeout(function () { self.animate(self) }, self.options.speed);
            });
          }
        },

        animate: function (self) {
          self.$el.attr('hero', this.timer);
          if ( self.timer === self.options.steps ) return self.timer = 0;
          self.timer += 1;
          setTimeout(function () { self.animate(self) }, self.options.speed);
        },

        _destroy: function () {
        },
      });

      $('#super-hero').superHero({
        target: '#super-hero',
        trigger: { click: '.text-super-hero' },
      });

      $('#switch-button').switchButton({
        //width: 100,
        //height: 40,
        //button_width: 50,
        labels_placement: "right",
      }).bind('change', function (event) {
        var isChecked = $(event.currentTarget).is(':checked');
        var $target = $('#neon');
        $target[ !isChecked ? 'removeClass' : 'addClass']('animate-lights-on');
      });

    },
  }
}]);
