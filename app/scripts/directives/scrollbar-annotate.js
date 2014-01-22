angular.module('portfolioApp')
.directive('scrollbarAnnotate', function () {
  return function (scope, element, attrs) {
    $(window).sausage({
      classes: 'hidden-xs',
      content: function (i, $page) {
        return '<span class="sausage-span">' + $page.attr('id') + '</span>'
      },
    });
  }
});
