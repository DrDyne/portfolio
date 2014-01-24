'use strict';

angular.module('portfolioApp')
.directive('demoBackbone', [function () {
  return {
    restrict: 'A',
    templateUrl: 'views/demo-backbone.html',
    controller: function ($scope, $element) {
      var Demo = Backbone.View.extend({
        events: {
          'click .blur-o-meter [blur]': 'updateBlur',
        },

        initialize: function (options) {
          var self = this;
          setTimeout(self.render.bind(self), 1000);
          this.listenTo(this.model, 'change:blur', this.renderBlur, this);
          this.listenTo(this.model, 'invalid', this.displayError, this);
        },

        getEl: function () { return this.$el.find('#twenty') },

        render: function () {
          var $el = this.getEl();
          $el.twentytwenty({default_offset_pct: 0.1});
          $el.find('.twentytwenty-overlay').unbind().remove();
        },

        updateBlur: function (event) {
          var value = event.currentTarget.getAttribute('blur');
          this.model.set('blur', value, {validate: true});
        },

        renderBlur: function (value) {
          var $img = this.getEl().find('.right');
          $img.attr('blur', this.model.get('blur'));
        },

        displayError: function (model, error) {
          this.$el.find('.alert').html(error);
        },
      });

      var Kitten = Backbone.Model.extend({
        defaults: {
          blur: 'regular',
        },
        validate: function (attrs, options) {
        console.log(attrs, options);
          if ( !attrs.blur ) return "blur value cannot be empty";
          if ( !!(attrs.blur*1) ) return "blur value cannot be a number";
        },
      });

      return new Demo({
        el: $element,
        model: new Kitten()
      });
    },
  }
}]);
