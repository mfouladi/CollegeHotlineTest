app.controller('signupController',['$scope', '$resource', function ($scope, $resource) {
	$scope.passwordMatch = false;
	$scope.emptyRequiredField = false;
	$scope.signupError = true;
	console.log($scope);


	$scope.checkPassword = function(){
		if($scope.username == '' || $scope.username === undefined ||
		   $scope.phoneNumber == '' || $scope.phoneNumber === undefined ||
		   $scope.firstName == '' || $scope.firstName === undefined ||
		   $scope.lastName == '' || $scope.lastName === undefined ||
		   $scope.email == '' || $scope.email === undefined ||
		   $scope.phoneNumber == '' || $scope.phoneNumber === undefined){
		   	console.log('here');
			$scope.emptyRequiredField = true;
		}
		else{
			$scope.emptyRequiredField = false;
		}

		if($scope.password !== undefined && $scope.password != ''){
			if($scope.password != $scope.confirmPassword){
				$scope.passwordMatch = true;
			}
			else{
				$scope.passwordMatch = false;
			}
		}

		$scope.signupError = $scope.emptyRequiredField && $scope.passwordMatch;
	}
	

}]);