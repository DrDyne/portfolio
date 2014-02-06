angular.module('portfolioApp')
.directive('scrollFollow', [function () {
  return {
    restrict: 'A',
    link: function ($scope, $element, $attr) {
      setTimeout(function () {
        $element.stickOnScroll({
          footerElement: $($attr.scrollStop),
          topOffset: $attr.scrollTopOffset || 50,
          bottomOffset: $attr.ScrollBottomOffset || 0,
          stickClass: $attr.scrollStickClass || 'sticked-top',
        });
      }, 1000);
    },
  }

}]);
