app.controller('volunteerController',['$scope', '$resource', 'availibilityTimer', 
	function ($scope, $resource, availibilityTimer) {

	availibilityTimer.timer();

	var VolunteerStatus = $resource('/api/volunteers/status');

	$scope.volunteers = [];

	//Query active and inactive conversations
	function updatePage(){
		//Find Inactive conversations
		VolunteerStatus.query({}, function (results){
			$scope.volunteers = results;
		});

	}

	updatePage();

	//update conversations every 30 seconds
	setInterval(function(){updatePage()}, 1000);
	
}]);