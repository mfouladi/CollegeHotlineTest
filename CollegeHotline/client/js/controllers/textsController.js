app.controller('textsController',['$scope', '$resource', function ($scope, $resource) {
	
	$scope.texts = [ ];

	$scope.actives = [ ];

	var SMS = $resource('/api/sms');
	var Accept = $resource('/api/sms/:mid');

	SMS.query({active: false}, function (results){
		$scope.texts = results;
	});

	SMS.query({active: true}, function (results){
		$scope.actives = results;
	});

	//All info for this should be coming from the phone API
	$scope.createTextMessage = function() {
		var sms = new SMS();
		var numTexts = 0;
		SMS.query(function (results){
			numTexts = results.length;
			sms.mid = numTexts + 1;
			sms.message = $scope.newMessage;
			sms.active = false;
			sms.phoneNumber = 3109479476;
			sms.uid = 0;
			sms.$save(function (result) {
				$scope.texts.push(result);
				$scope.newMessage = '';
			});
		});
	}

	//Send the server info for which message you want to accept
	$scope.acceptText = function(message, phoneNumber, id) {
		var accept = new SMS();
		for(var i=0; i< $scope.texts.length; i++){
			if($scope.texts[i].mid == id){
				$scope.texts.splice(i, 1);
				break;
			}
		}
		Accept.delete({mid: id}, function (results){
			
		});
		accept.mid = id;
		accept.message = message;
		accept.phoneNumber = phoneNumber;
		accept.uid = 1;
		accept.active = true;
		accept.$save(function (result) {
			$scope.actives.push(result);
		});
	}

	$scope.rejectText = function(message, phoneNumber, id)  {
		var accept = new SMS();
		for(var i=0; i< $scope.actives.length; i++){
			if($scope.actives[i].mid == id){
				$scope.actives.splice(i, 1);
				break;
			}
		}
		Accept.delete({mid: id}, function (results){
			
		});
		accept.mid = id;
		accept.message = message;
		accept.phoneNumber = phoneNumber;
		accept.uid = 0;
		accept.active = false;
		accept.$save(function (result) {
			$scope.texts.push(result);
		});
	}

	$scope.conversation = [
		{student: "Hi, can I get some help?", volunteer: "Yes! I am here to serve."},
		{student: "How much wood can I woodchuck chuck if a woodchuck could chuck wood? ", volunteer: "24,000 metric tons in a lifetime"},
		{student: "Really? Wow! Thansk!", volunteer: "Now let me ask you a question."},
		{student: "Um... okay. What is the question?", volunteer: "If you had to get a cabbage, a wolf, and a sheep across a river on a boat but could only take two of them with you at a time what would you do?"},
		{student: "Easy. I would shoot the wolf, and take the dead wolf and the sheep across. Then I would come back for the cabbage.", volunteer: "Nice! Thinking outside the box I see. You will make it far kid."}
	];

}]);
