app.controller('conversationController',['$scope', '$resource', function ($scope, $resource) {
	
	$scope.inactiveConversations 			= [ ];
	$scope.activeConversations				= [ ];
	$scope.currentConversation				= [ ];
	$scope.currentConversationPhoneNumber 	= 0;

	var ActiveConversations 	= $resource('/api/conversation/active');
	var InactiveConversations  	= $resource('/api/conversation/inactive');
 	var Message 				= $resource('/api/conversation/create');
	var Activate 				= $resource('/api/conversation/activate/:phoneNumber');
	var Deactivate 				= $resource('/api/conversation/deactivate/:phoneNumber');
	var Open 					= $resource('/api/conversation/open/:phoneNumber');
	var Login 					= $resource('/loggedin');
	var sendUrl 				= $resource('/api/cloudPhone/sendMsg');	

	updatePage();


	Login.query({}, function (results){
			//console.log(results[0]._id);
			if(results.length > 0){
				$scope.isLoggedIn = true;
				$scope.user = results[0];
			}
			else
				$scope.isLoggedIn = false;
		});



	//Query active and inactive conversations
	function updatePage(){
		//Find Inactive conversations
		InactiveConversations.query({active: false}, function (results){
			$scope.inactiveConversations = results;
		});

		ActiveConversations.query({active: true}, function (results){
			$scope.activeConversations = results;
		});

		for(i = 0; i < $scope.activeConversations.length; i++){
				if ($scope.activeConversations[i].phoneNumber == $scope.currentConversationPhoneNumber){
					$scope.currentConversation = $scope.activeConversations[i].messages;
				}
			}	
	}
	
	//update conversations every second
	setInterval(function(){updatePage()}, 1000);


	//All info for this should be coming from the phone API
	$scope.createConversation = function() {
		var conversation = new Message();
		conversation.text = $scope.newText;
		conversation.phoneNumber = $scope.currentConversationPhoneNumber;
		conversation.$save(function (result){
			console.log(result);
			if (result.phoneNumber != null){
				$scope.inactiveConversations.push(result);
			}
			$scope.newText = '';
			$scope.newNumber = '';
		});
	}

	$scope.activateConversation = function(index, activatePhoneNumber) {
		Activate.query({phoneNumber : activatePhoneNumber}, function (results){
			$scope.activeConversations.push(results[0]);
			$scope.currentConversationPhoneNumber = results[0].phoneNumber;
			$scope.currentConversation = results[0].phoneNumber;
		});
		$scope.inactiveConversations.splice(index, 1);
	}

	$scope.deactivateConversation = function(index, deactivatePhoneNumber) {
		Deactivate.query({phoneNumber : deactivatePhoneNumber}, function (results){
			if(results[0].unansweredMessageCount > 0)
				$scope.inactiveConversations.push(results[0]);
		});
		if($scope.activeConversations[index].phoneNumber == $scope.currentConversationPhoneNumber){
			$scope.currentConversation = [];
			$scope.currentConversationPhoneNumber = 0;
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


	$scope.sendMsg = function() {
		var conversation = new Message();
		conversation.text = $scope.newResponse;
		conversation.phoneNumber = $scope.currentConversationPhoneNumber;
		conversation.isVolunteer = true;
		console.log(conversation);
		//get volunteer id with matin's things

		sendUrl.query(conversation, function(result){console.log(result);});

		conversation.$save(function (result){
			console.log(result);
			if (result.phoneNumber != null){
				$scope.inactiveConversations.push(result);
			}
			$scope.newResponse = '';
		});
	}

 }]);
