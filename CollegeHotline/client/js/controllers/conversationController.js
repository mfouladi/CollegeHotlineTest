app.controller('conversationController',['$scope', '$resource', function ($scope, $resource) {

	var Conversation = $resource('/api/conversation');

	$scope.conversations = [ ];

	//TODO: Dynamic ID based on who is logged in
	Message.query({currentVolunteerID: 603909726}, function (results)
		$scope.conversations = results;
	});

	//Code should be incorporated into logic for accepting a message
	//from the queue:
	//If there's already a conversation, add the accepted message.
	//If there's not a conversation, create a new one and add the
	//accepted message (this code)
	$scope.createConversation = function(message){
		var conversation = new Conversation();
		conversation.phoneNumber = message.phoneNumber;
		//TODO Dynamic ID based on who is logged in
		conversation.currentVolunteerID = 603909726;
		conversation.messages.push(message);
		conversation.$save(function (result){
			$scope.conversations.push(result){
			});
		});
	}

	//

}]);