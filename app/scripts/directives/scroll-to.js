angular.module("portfolioApp")
.directive("scrollTo", ["$window", function ($window){
  return {
    restrict : "AC",
    compile : function(){
      var document = $window.document;
      
      function scrollInto (id) {
        if ( !id ) return $window.scrollTo(0, 0);
        var el = document.getElementById(id);
        if ( el ) el.scrollIntoView();
      }

      return function(scope, element, attr) {
        element.bind("click", function (event){
          console.log('scroll to', attr.scrollTo);
          event.preventDefault();
          scrollInto(attr.scrollTo);
        });
      };
    }
  };
}]);
