app.controller('conversationController',['$scope', '$resource', function ($scope, $resource) {
	
	$scope.inactiveConversations 	= [ ];
	$scope.activeConversations		= [ ];
	$scope.currentConversation		= [ ];
	$scope.currentConversationPhoneNumber = 0;

	var Message 		= $resource('/api/conversation/create');//to be removed
	var Accept 			= $resource('/api/message/:mid');//to be removed

	var Conversation 	= $resource('/api/conversation');
	var Activate 		= $resource('/api/conversation/activate/:phoneNumber');
	var Deactivate 		= $resource('/api/conversation/deactivate/:phoneNumber');
	var Open 			= $resource('/api/conversation/open/:phoneNumber');
	
	//Query inactive conversations
	Conversation.query({active: false}, function (results){
		$scope.inactiveConversations = results;
	});

	//db.test.find({shapes: {"$elemMatch": {color: "red"}}}, {"shapes.color":1})

	//Query active conversations
	Conversation.query({active: true}, function (results){
		$scope.activeConversations = results;
	});

	//All info for this should be coming from the phone API
	$scope.createConversation = function() {
		var conversation = new Message();
		conversation.text = $scope.newText;
		conversation.phoneNumber = $scope.newNumber;
		conversation.$save(function (result){
			$scope.inactiveConversations.push(result);
			$scope.newText = '';
			$scope.newNumber = '';
		});
	}

	$scope.activateConversation = function(index, activatePhoneNumber) {
		Activate.query({phoneNumber : activatePhoneNumber}, function (results){
			$scope.activeConversations.push(results[0]);
		});
		$scope.inactiveConversations.splice(index, 1);
	}

	$scope.deactivateConversation = function(index, deactivatePhoneNumber) {
		Deactivate.query({phoneNumber : deactivatePhoneNumber}, function (results){
			$scope.inactiveConversations.push(results[0]);
		});
		if($scope.activeConversations[index].phoneNumber == $scope.currentConversationPhoneNumber){
			$scope.currentConversation = [];
		}
		$scope.activeConversations.splice(index, 1);
	}

	$scope.openConversation = function(index, openPhoneNumber){
		Open.query({phoneNumber: openPhoneNumber}, function (results){
			$scope.activeConversations[index] = results[0];
		});
		$scope.currentConversation = $scope.activeConversations[index].messages;
		$scope.currentConversationPhoneNumber = $scope.activeConversations[index].phoneNumber;
	}

	$scope.addMessageToConversation = function(index, deactivatePhoneNumber) {
		Conversation.query({phoneNumber : deactivatePhoneNumber}, function (results){
			$scope.inactiveConversations.push(results[0]);
		});
		if($scope.activeConversations[index].phoneNumber == $scope.currentConversationPhoneNumber){
			$scope.currentConversation = [];
		}
		$scope.activeConversations.splice(index, 1);
	}

/*
	$scope.createConversation = function(){
		var conversation = new Conversation();
		//console.log("created conversation");
		//var message = new Message();
		conversation.message[0].text = $scope.newText;
		//console.log("added message text");
		conversation.message[0].phoneNumber = $scope.newNumber;
		//console.log("added phone number"):
		//conversation.messages.push(message);
		conversation.phoneNumber = phoneNumber;
		scope.inactiveConversations.push(conversation);
		conversation.$save(function (result) {
			$scope.inactiveConversations.push(result);
			$scope.newText = '';
			$scope.newNumber = '';
		});
	}
*/
	//Send the server info for which message you want to accept
	//This should search the conversations db for all other messages
	//from the same number and add the conversation to the right column
// 	$scope.acceptMessage = function(text, phoneNumber, id) {
// 		var accept = new Message();
// 		for(var i=0; i< $scope.inactiveConversations.length; i++){
// 			if($scope.inactiveConversations[i].mid == id){
// 				$scope.inactiveConversations.splice(i, 1);
// 				break;
// 			}
// 		}
// 		Accept.delete({mid: id}, function (results){
			
// 		});
// 		accept.mid = id;
// 		accept.text = text;
// 		accept.phoneNumber = phoneNumber;
// 		accept.active = true;
// 		accept.$save(function (result) {
// 			$scope.activeConversations.push(result);
// 		});
// 	}

// 	//Rework this to drop a whole conversation
// 	$scope.rejectMessage = function(text, phoneNumber, id)  {
// 		var accept = new Message();
// 		for(var i=0; i< $scope.activeConversations.length; i++){
// 			if($scope.activeConversations[i].mid == id){
// 				$scope.activeConversations.splice(i, 1);
// 				break;
// 			}
// 		}
// 		Accept.delete({mid: id}, function (results){
			
// 		});
// 		accept.mid = id;
// 		accept.text = text;
// 		accept.phoneNumber = phoneNumber;
// 		accept.active = false;
// 		accept.$save(function (result) {
// 			$scope.inactiveConversations.push(result);
// 		});
// 	}
 }]);
