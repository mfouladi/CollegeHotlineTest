app.controller('conversationController',['$scope', '$resource', function ($scope, $resource) {
	
	$scope.inactiveConversations 	= [ ];
	$scope.activeConversations		= [ ];
	$scope.currentConversation		= [ ];
	$scope.currentConversationPhoneNumber = 0;

	var Conversation 	= $resource('/api/conversation');
	var Message 		= $resource('/api/conversation/create');
	var Activate 		= $resource('/api/conversation/activate/:phoneNumber');
	var Deactivate 		= $resource('/api/conversation/deactivate/:phoneNumber');
	var Open 			= $resource('/api/conversation/open/:phoneNumber');
	

	updatePage();

	//Query active and inactive conversations
	function updatePage(){
		Conversation.query({active: false}, function (results){
		$scope.inactiveConversations = results;
		});
		Conversation.query({active: true}, function (results){
			$scope.activeConversations = results;
		});
	}
	
	//update conversations every second
	setInterval(function(){updatePage()}, 1000);

	//All info for this should be coming from the phone API
	$scope.createConversation = function() {
		var conversation = new Message();
		conversation.text = $scope.newText;
		conversation.phoneNumber = $scope.newNumber;
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

 }]);
