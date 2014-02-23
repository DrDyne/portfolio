'use strict';
angular.module('portfolioApp')
.directive('ryActivity', [function () {
  return {
    restrict: 'A',
    transclude: true,
    scope: {},
    templateUrl: 'views/section-activity.html',
    link: function (scope, element, attrs) {
      scope.activity = {
        title: attrs.title,
        subtitle: attrs.subtitle,
        logo: attrs.logo,
        logoAlt: attrs.logoAlt,
        logoStyle: attrs.logoStyle,
      }
    },
}
}])

