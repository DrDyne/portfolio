angular.module('portfolioApp')
.directive('scrollbarAnnotate', function () {
  return function (scope, element, attrs) {
    setTimeout(function () {
    $(window).sausage({
      classes: 'visible-lg visible-md',
      content: function (i, $page) {
        var id = $page.attr('id');
        return '<span class="sausage-span" data-target=' +id+ '>' +id+ '</span>'
      },
      //onClick: function (event) {
      //  var target = $(event.currentTarget).find('.sausage-span').attr('data-target');
      //  clicky.log('/', target);
      //}
    });
    }, 1000);
  }
});
