app.controller('loginController',['$scope', '$resource', 'availibilityTimer', function ($scope, $resource, availibilityTimer) {
	
	//availibilityTimer.timer();

	$scope.isLoggedIn = false;

	var Login = $resource('/loggedin');

	Login.query({}, function (results){
		if(results.length > 0)
			$scope.isLoggedIn = true;
		else
			$scope.isLoggedIn = false;
	});

	

}]);