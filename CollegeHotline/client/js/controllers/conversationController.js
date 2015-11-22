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
		$scope.user = {};
		if(results.length > 0){
			$scope.isLoggedIn = true;
			$scope.user._id = results[0];
		}
		else {
			$scope.isLoggedIn = false;
		}
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

		len = $scope.currentConversation.length;

		for(i = 0; i < $scope.activeConversations.length; i++){
			if ($scope.activeConversations[i].phoneNumber == $scope.currentConversationPhoneNumber
				&& $scope.activeConversations[i].currentVolunteerID == $scope.user._id){
				$scope.currentConversation = $scope.activeConversations[i].messages;
			}
		}

		if ($scope.currentConversation.length > len)
			setTimeout(function(){scrollConversation()}, 5);	
	}

	
	function scrollConversation(){
		var elem = document.getElementById('currentMessage');
  		elem.scrollTop = elem.scrollHeight;
  	}

	//update conversations every second
	setInterval(function(){updatePage()}, 1000);


	//All info for this should be coming from the phone API
	$scope.createConversation = function() {
		var conversation = new Message();
		conversation.text = $scope.newText;
		conversation.phoneNumber = $scope.currentConversationPhoneNumber;
		conversation.$save(function (result){
			if (result.phoneNumber != null){
				$scope.inactiveConversations.push(result);
			}
			$scope.newText = '';
			$scope.newNumber = '';
				
		});
	}

	$scope.activateConversation = function(index, activatePhoneNumber) {
		Activate.get({phoneNumber : activatePhoneNumber}, function (result){
			$scope.activeConversations.push(result);
			$scope.inactiveConversations.splice(index, 1);
			setTimeout(function(){$scope.openConversation($scope.activeConversations.length - 1, activatePhoneNumber)}, 5);
		});
	}

	$scope.deactivateConversation = function(index, deactivatePhoneNumber) {
		Deactivate.get({phoneNumber : deactivatePhoneNumber}, function (result){
			if(result.unansweredMessageCount > 0){
				$scope.inactiveConversations.push(result);
			}
		});
		if($scope.activeConversations[index].phoneNumber == $scope.currentConversationPhoneNumber){
			$scope.currentConversation = [];
			$scope.currentConversationPhoneNumber = 0;
		}
		$scope.activeConversations.splice(index, 1);
	}

	$scope.openConversation = function(index, openPhoneNumber){
		Open.get({phoneNumber: openPhoneNumber}, function (result){
			$scope.activeConversations[index] = result;
			$scope.currentConversation = $scope.activeConversations[index].messages;
			$scope.currentConversationPhoneNumber = $scope.activeConversations[index].phoneNumber;
			setTimeout(function(){scrollConversation()}, 5);
		});
	}


	$scope.sendMsg = function() {
		var conversation = new Message();
		conversation.text = $scope.newResponse;
		conversation.phoneNumber = $scope.currentConversationPhoneNumber;
		conversation.isVolunteer = true;
		sendUrl.query(conversation, function(result){});
		conversation.$save(function (result){
			if (result.phoneNumber != null){
				$scope.inactiveConversations.push(result);
			}
			$scope.newResponse = '';
		});
	}

 }]);
