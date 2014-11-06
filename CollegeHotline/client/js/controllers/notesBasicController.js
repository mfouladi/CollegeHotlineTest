app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	var NotesBasic = $resource('/api/notes/basic');
	NotesBasic.query(function (results){
		$scope.parsedInfo = results;
	});
	
	$scope.phoneNumber;
	$scope.studentName;
	$scope.schoolName;
	$scope.gpa;
	$scope.graduationDate;

	
/* 	NotesBasic.query(
	
	) */

	var parsedInfo = [{key: "jew", val: "banker" }, 
		{key: "praise", val: "allah"}];
	//$scope.parsedInfo = parsedInfo;
	// phoneNumber			: Number,
	// studentName			: {first: String, last: String},
	// schoolName			: String,
	// gpa					: Number,
	// graduationDate		: Date

}]);