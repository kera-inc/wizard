var directives = require('../index')
  , $ = require('jquery')
  , bootingSubNav = require('booting-sub-nav');

directives.directive('wizard', ['$parse', function($parse) {
  return {
    restrict: 'E',
    controller: 'WizardCtrl',
    scope: {
      active: '='
    },

    transclude: true,
    template: '<ul class="wizard_steps" ng-class="activeClass()"><li class="wizard_step" ng-repeat="step in steps" ng-class="getClassForStep(step)">{{ step.label }}</li></ul> <div ng-transclude></div>',
    link: function(scope, element, attrs, ctrl) {
      var list = $(element).find('.wizard_steps')[0];

      setTimeout(function() {
        bootingSubNav(list, null, 'scrolled');
      }, 200);

      var originalActive = scope.active;
      console.log(originalActive);

      scope.getClassForStep = function(step) {
        var className = '';

        if (step.selected) {
          className += ' selected';
        }

        if (step.completed) {
          className += ' completed';
        }

        return className;
      };

      scope.activeClass = function() {
        var className = '';

        if (originalActive) {
          className += ' active';
        }

        return className;
      };

      ctrl.init(scope.active);
    }
  };
}]);
