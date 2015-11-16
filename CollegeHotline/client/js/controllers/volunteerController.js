app.controller('volunteerController',['$scope', '$resource', 
	function ($scope, $resource) {

	var VolunteerStatus = $resource('/api/volunteers/status');

	$scope.volunteers = [];

	function sortVolunteers(a, b){
		if(a.available && !b.available){
			return -1;
		} else if(!a.available && b.available){
			return 1;
		} else if(a.available && b.available){
			return 0;
		} else if(a.online && !b.online){
			return -1;
		} else if(!a.online && b.online){
			return 1;
		} else if(a.online && b.online){
			return 0;
		} else if(a.firstName < b.firstName){
			return -1;
		} else if(a.firstName > b.firstName){
			return 1;
		} else {
			return 0;
		}
	}

	//Query active and inactive conversations
	function updatePage(){
		//Find Inactive conversations
		VolunteerStatus.query({}, function (results){
			results.sort(sortVolunteers);
			$scope.volunteers = results;
		});

	}

	updatePage();

	//update conversations every 30 seconds
	setInterval(function(){updatePage()}, 1000);
	
}]);