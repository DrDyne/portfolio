angular.module('portfolioApp')
.directive('jqSlider', function () {
  return function (scope, element, attrs) {
    element.sudoSlider({
      responsive: true,
    });
  }
});
