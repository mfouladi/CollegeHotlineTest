var app = angular.module('CH_Messaging_App', ['ngResource']);

app.service('availibilityTimer', ['$resource', '$window', function ($resource, $window) {
  
  var StopAvailibilityTimer = $resource('/api/availibility/stop');
  var StartAvailibilityTimer = $resource('/api/availibility/start');

  this.timer = function(){
    $window.onload = function(e){
      StopAvailibilityTimer.query({}, function(results){});
    }

    $window.onbeforeunload = function(e){
      StartAvailibilityTimer.query({}, function(results){});
    };
  }

}]);
