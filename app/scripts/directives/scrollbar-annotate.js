angular.module('portfolioApp')
.directive('scrollbarAnnotate', function () {
  return function (scope, element, attrs) {
    $(window).sausage({
      content: function (i, $page) {
        return '<span class="sausage-span">' + $page.attr('id') + '</span>'
      },
    });
  }
});
