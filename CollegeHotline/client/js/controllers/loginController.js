app.controller('loginController',['$scope', '$resource', function ($scope, $resource) {
	$scope.isLoggedIn = false;

	var Login = $resource('/loggedin');

	Login.query({}, function (results){
		console.log(results);
		if(results.length > 0)
			$scope.isLoggedIn = true;
		else
			$scope.isLoggedIn = false;
	});

	

}]);