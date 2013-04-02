var ctrls = require('./index')
  , _ = require('underscore');

ctrls.controller('WizardCtrl', ['$scope', function($scope) {
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

    if (step == $scope.steps[0]) {
      step.element.show();
    } else {
      step.element.slideDown();
    }

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
