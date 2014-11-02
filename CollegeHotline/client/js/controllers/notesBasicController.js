app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	var NotesBasic = $resource('/api/notes/basic/:phoneNumber');

	$scope.phoneNumber;
	$scope.studentName;
	$scope.schoolName;
	$scope.gpa;
	$scope.graduationDate;

	




	// phoneNumber			: Number,
	// studentName			: {first: String, last: String},
	// schoolName			: String,
	// gpa					: Number,
	// graduationDate		: Date

}