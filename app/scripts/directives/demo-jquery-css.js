'use strict';

angular.module('portfolioApp')
.directive('demoJqueryCss', ['Tracker', function (Tracker) {
  return {
    restrict: 'E',
    templateUrl: 'views/demo-jquery-css.html',
    controller: function ($scope, $element) {
      $.widget('demo.superHero', {
        options: {
          speed: 400,
          steps: 3,
          target: undefined,
          preventDefault: true,
        },

        _create: function () {
          this.$el = $(this.options.target);
          this.timer = 0;
          this.bindEvents(this);
        },

        bindEvents: function (self) {
          for ( var event in self.options.trigger ) {
            $(self.options.trigger[event]).bind(event, function (e) {
              if ( self.options.preventDefault ) e.preventDefault();
              setTimeout(function () { self.animate(self) }, self.options.speed);
            });
          }
        },

        animate: function (self) {
          if ( self.timer === 0 ) Tracker.track({action: 'play-css-animation-hero'});
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
        //show_labels: false,
        width: 50,
        height: 20,
        button_width: 25,
        labels_placement: "right",
      }).bind('change', function (event) {
        var isChecked = $(event.currentTarget).is(':checked');
        $('.neon-container-well').animate({'background-color': (!isChecked? 'transparent' : '#222')}, function () {
          setTimeout(function () {
            if ( !isChecked ) Tracker.track({action: 'play-css-animation-neon'});
            $('#neon')[ !isChecked ? 'removeClass' : 'addClass']('animate-lights-on');
          }, 500);
        });
      });

    },
  }
}]);
