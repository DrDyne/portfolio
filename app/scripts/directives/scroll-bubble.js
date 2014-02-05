angular.module('portfolioApp')
.directive('scrollBubble', ['$window', function (window) {
  return {
    restrict: 'AC',
    compile: function (scope, element, attrs) {
      var scrollTimer = null;

      $(window).scroll(function() {
        var viewportHeight = $(this).height(),
          scrollbarHeight = viewportHeight / $(document).height() * viewportHeight,
          progress = $(this).scrollTop() / ($(document).height() - viewportHeight),
          //distance = progress * (viewportHeight - scrollbarHeight) + scrollbarHeight / 2 - $('#scrollbubble').height() / 2
          distance = progress * viewportHeight + 1
          ;

        $('#' + element.id)
          .css('top', distance)
          //.text(Math.round(progress * 100) + '%)')
          .fadeIn(100)
          ;

        // Fade out the annotation after 1 second of no scrolling.
        if (scrollTimer !== null) { clearTimeout(scrollTimer); }
        scrollTimer = setTimeout(function() {
          $('#scrollbubble').fadeOut();
        }, 1000);
      });
    },
  }

}]);
