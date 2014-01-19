angular.module('portfolioApp')
.directive('jqSlider', function () {
  //var buttons = {
  //  'prev': '<div class="jq-slide-nav nav-left"><span class="jq-slide-nav-first" rel="first">&#8629;</span><span class="jq-slide-nav-prev">&#8592;</span></div>',
  //  'next': '<div class="jq-slide-nav nav-right"><span class="jq-slide-nav-next">&#8594;</span></div>',
  //};

  return function (scope, element, attrs) {
    element.sudoSlider({
      responsive: true,
      speed: 400,
      customLink: '.slider-nav-' + attrs.jqSliderCustomlink + ' .jq-slider-link',
      controlsFade: true,
      prevNext: false,
    });

  }
});
