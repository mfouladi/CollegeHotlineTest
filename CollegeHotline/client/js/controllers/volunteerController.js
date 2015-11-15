app.controller('volunteerController',['$scope', '$resource', 
	function ($scope, $resource) {

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