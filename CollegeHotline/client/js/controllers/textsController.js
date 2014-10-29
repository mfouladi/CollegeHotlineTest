app.controller('textsController',['$scope', '$resource', function ($scope, $resource) {
	var SMS = $resource('/api/sms');

	SMS.query(function (results){
		$scope.texts = results;
	});

	$scope.texts = [ ];

	$scope.actives = [ ];

	//$scope.createTextMessage = function () {
	//	$scope.texts.push({ message: $scope.newMessage});
	//	$scope.newMessage = '';
	//};

	$scope.createTextMessage = function() {
		var sms = new SMS();
		sms.message = $scope.newMessage;
		sms.$save(function (result) {
			$scope.texts.push(result);
			$scope.newMessage = '';
		});
	}

	$scope.acceptText = function() {
		$scope.actives.push({ message: $scope.acceptedMessage});
		//$scope.texts.remove({ message: $scope.acceptedMessage});
	}

}]);
