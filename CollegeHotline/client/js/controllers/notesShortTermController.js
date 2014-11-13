app.controller('notesShortTermController',['$scope', '$resource', function ($scope, $resource) {

	$scope.goals = [];
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});
	$scope.goals.push({body: "Apply to CalStates"});
	$scope.goals.push({body: "Apply to UCs"});
	$scope.goals.push({body: "Get into College!"});

	console.log($scope.goals);

	$scope.createNewGoal = function(){
		$scope.goals.push({body: $scope.newGoal});
	}
}]);