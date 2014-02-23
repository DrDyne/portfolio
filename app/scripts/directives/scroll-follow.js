angular.module('portfolioApp')
.directive('scrollFollow', ['Tracker', function (Tracker) {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attrs) {
      setTimeout(function () {
        $element.stickOnScroll({
          footerElement: $($attrs.scrollStop),
          topOffset: $attrs.scrollTopOffset || 50,
          bottomOffset: $attrs.ScrollBottomOffset || 0,
          stickClass: $attrs.scrollStickClass || 'sticked-top',
          onStick: function ($el) { Tracker.track({action: $attrs.scrollFollow}); },
          //onUnStick: function ($el) { }
        });
      }, 1000);
    },
  }

}]);
