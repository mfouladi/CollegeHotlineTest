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

app.directive('chLoggedinNavbar', [function() {
  return {
    restrict: 'CEMA', // C: class, E: element, M: comments, A: attributes
    replace: true, // replaces original content with template
    template:'<nav class="navbar navbar-default navbar-fixed-top" role="navigation"> <div class="container-fluid"> <div class="navbar-header"> <a href="/"> <img src="/images/LogoSolidGuy1.gif" alt="College Hotline" id="logo" /> </a> </div> <div> <ul class="nav navbar-nav"> <li><a href="/conversations">Text Messages</a></li> <li><a href="/notes">Phone Calls</a></li> <li><a href="/volunteers">Volunteers</a></li> <li><a href="/profile">Profile</a><li> </ul> <ul class="nav navbar-nav navbar-right"> <li ><a href="home">Home</a></li> <li class="page_item page-item-5"><a href="about">About</a></li> <li><a href="/logout">Sign Out</a></li> </ul> </div> </div> </nav>'
  }
}]);

app.directive('chLoggedinNavbar', [function() {
  return {
    restrict: 'CEMA', // C: class, E: element, M: comments, A: attributes
    replace: true, // replaces original content with template
    templateUrl:'navbar.html'
  }
}]);
