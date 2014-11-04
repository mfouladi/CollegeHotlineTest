app.controller('messageController',['$scope', '$resource', function ($scope, $resource) {
	
	$scope.messages 		= [ ];
	$scope.conversations 	= [ ];

	var Message 		= $resource('/api/message');
	var Accept 			= $resource('/api/message/:mid');
	var Conversation 	= $resource('/api/conversation');
	

	//Query messages collection for inactive messages
	Message.query({active: false}, function (results){
		$scope.messages = results;
	});

	//Query messages collection for active messages
	//Needs to change to deal with conversations instead
	Message.query({active: true}, function (results){
		$scope.conversations = results;
	});

	//All info for this should be coming from the phone API
	$scope.createMessage = function() {
		var message = new Message();
		var numTexts = 0;
		Message.query(function (results){
			numMessages = results.length;
			message.mid = numMessages + 1;
			message.text = $scope.newText;
			message.active = false;
			message.phoneNumber = 3109479476;
			message.$save(function (result) {
				$scope.messages.push(result);
				$scope.newText = '';
			});
		});
	}

	//Send the server info for which message you want to accept
	//This should search the conversations db for all other messages
	//from the same number and add the conversation to the right column
	$scope.acceptMessage = function(text, phoneNumber, id) {
		var accept = new Message();
		for(var i=0; i< $scope.messages.length; i++){
			if($scope.messages[i].mid == id){
				$scope.messages.splice(i, 1);
				break;
			}
		}
		Accept.delete({mid: id}, function (results){
			
		});
		accept.mid = id;
		accept.text = text;
		accept.phoneNumber = phoneNumber;
		accept.active = true;
		accept.$save(function (result) {
			$scope.conversations.push(result);
		});
	}

	//Rework this to drop a whole conversation
	$scope.rejectMessage = function(text, phoneNumber, id)  {
		var accept = new Message();
		for(var i=0; i< $scope.conversations.length; i++){
			if($scope.conversations[i].mid == id){
				$scope.conversations.splice(i, 1);
				break;
			}
		}
		Accept.delete({mid: id}, function (results){
			
		});
		accept.mid = id;
		accept.text = text;
		accept.phoneNumber = phoneNumber;
		accept.active = false;
		accept.$save(function (result) {
			$scope.messages.push(result);
		});
	}

}]);
