app.controller('meetupsController',['$scope', '$resource', function ($scope, $resource) {
	$scope.meetups = [
		{name: "Meetup 1"},
		{name: "Meetup 2"}
	];

	$scope.createMeetup = function () {
		$scope.meetups.push({ name: $scope.meetupName});
		$scope.meetupName = '';
	};
}]);