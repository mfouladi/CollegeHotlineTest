app.controller('profileController',['$scope', '$resource', 'availibilityTimer', 
	function ($scope, $resource, availibilityTimer) {

	availibilityTimer.timer();
	
}]);