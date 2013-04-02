var directives = require('./index')
  , $ = require('jquery');

directives.directive('step', function() {
  return {
    restrict: 'E',
    require: '^wizard',
    scope: {
      label: '@',
      navLabel: '@',
      buttonLabel: '@',
      completed: '&'
    },

    transclude: true,

    template: '<h2>{{ label }}</h2><div ng-transclude></div><button class="cta next_button" ng-click="next()">{{ buttonLabel || "Next" }}</button>',

    link: function(scope, element, attrs, ctrl) {
      var step = {
        element: $(element),
        selected: false
      };

      scope.$watch('navLabel', function(newLabel) {
        step.label = newLabel || scope.label;
      });

      ctrl.registerStep(step, function() {
        scope.completed();
      });

      scope.next = function() {
        ctrl.next(step);
      };
    }
  };
});
