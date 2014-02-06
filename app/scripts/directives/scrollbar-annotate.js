angular.module('portfolioApp')
.directive('scrollbarAnnotate', function () {
  return function (scope, element, attrs) {
    setTimeout(function () {
    $(window).sausage({
      classes: 'visible-lg visible-md',
      content: function (i, $page) {
        return '<span class="sausage-span">' + $page.attr('id') + '</span>'
      },
    });
    }, 1000);
  }
});
