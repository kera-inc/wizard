var _ = require('underscore');

angular.module('kera-inc/wizard').controller('WizardCtrl', ['$scope', function($scope) {
  $scope.steps = [];
  var stepCallbacks = [];
  var currentStep;

  this.registerStep = function(step, callback) {
    step.element.hide();
    $scope.steps.push(step);
    stepCallbacks.push(callback);
  };

  this.init = function(active) {
    if (active) {
      showStep($scope.steps[0]);
    } else {
      _.each($scope.steps, function(step) {
        step.element.addClass('expanded');
        step.element.show();
      });
    }
  };

  function showStep(step) {
    currentStep = step;
    step.element.show();
    step.selected = true;
  }

  this.next = function(step) {
    var completedIndex = $scope.steps.indexOf(step);
    step.element.addClass('completed');
    step.completed = true;
    step.selected = false;
    stepCallbacks[completedIndex]();

    var nextStep = $scope.steps[completedIndex + 1];

    if (nextStep) {
      showStep(nextStep);
    }
  };
}]);
