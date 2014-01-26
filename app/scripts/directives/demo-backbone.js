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
          'click .clear-history': 'clearHistory',
        },

        initialize: function (options) {
          var self = this;
          setTimeout(self.render.bind(self), 1000);
          this.listenTo(this.model, 'change:blur', this.renderBlur, this);

          this.listenTo(this.model, 'change:blur', this.updateHistory.bind(this, 'success'));
          this.listenTo(this.model, 'invalid', this.updateHistory.bind(this, 'error'));

          this.listenTo(this.collection, 'all', this.renderHistory, this);
        },

        getEl: function () { return this.$el.find('#twenty') },

        render: function () {
          var $el = this.getEl();
          $el.twentytwenty({default_offset_pct: 0.1});
          $el.find('.twentytwenty-overlay').unbind().remove();
          this.renderClearHistoryLink();
        },

        updateBlur: function (event) {
          var value = event.currentTarget.getAttribute('blur');
          this.model.set('blur', value, {validate: true});
        },

        renderBlur: function (value) {
          var $img = this.getEl().find('.right');
          $img.attr('blur', this.model.get('blur'));
        },

        clearHistory: function () {
          this.collection.clear();
        },

        updateHistory: function (type, model, value) {
          var options = { type: type, reason: value, value: value };
          this.collection.addEntry(options);
        },

        renderHistory: function () {
          var $history = this.$el.find('.history')
          $history.html('');
          var template = this.tpl.message;

          _.forEach(this.collection.invoke('message'), function (message) {
            var el = _.template(template, message);
            console.log(el);
            $history.append(el);
          });
          this.renderClearHistoryLink();
        },

        renderClearHistoryLink: function () {
          var $clearHistory = this.$el.find('.clear-history');
          $clearHistory[ this.collection.isEmpty() ? 'hide' : 'show']();
        },

        tpl: {
          message: '<p class="text-<%= type %>"><%= content %></p>',
        },
      });

      var Kitten = Backbone.Model.extend({
        defaults: {
          blur: 'regular',
        },
        validate: function (attrs, options) {
          if ( !attrs.blur ) return "blur value cannot be empty";
          if ( !!(attrs.blur*1) ) return "blur value cannot be a number";
        },
      });

      var History = Backbone.Collection.extend({
        maxSize: 5,
        model: Backbone.Model.extend({
          defaults: {
            type: undefined,
            value: undefined,
            reason: undefined,
          },
          isError: function () { return this.get('type') === 'error' },
          message: function () {
            if ( this.isError() )
              return {
                type: 'warning',
                content: this.get('reason').replace('blur value ', '')
              };
            return {
              type: 'success',
              content: this.get('value')
            }
          },
        }),

        addEntry: function (entry) {
          var first;
          if ( this.length >= this.maxSize ) first = this.shift();
          this.add(entry);
          return first;
        },

        clear: function () {
          this.reset();
        },
      });

      return new Demo({
        el: $element,
        model: new Kitten(),
        collection: new History()
      });
    },
  }
}]);
