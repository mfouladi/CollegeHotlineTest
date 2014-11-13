app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	$scope.phoneNumber = {key: "phoneNumber", value: "", placeholder:"Search by Phone Number"};

	$scope.basicInfo = [
	{key: "firstName", value:"", placeholder:"First Name"},
	{key: "lastName", value: "", placeholder:"Last Name"},
	{key: "schoolName", value: "", placeholder: "School Name"},
	{key: "graduationYear", value: "", placeholder: "Graduation Year"},
	{key: "gpa", value:"", placeholder: "GPA"}
	];

	$scope.parsedInfo = [];

	var NotesBasic = $resource('/api/notes/basic');

	$scope.phoneSearch = function() {
		var searchNote = new NotesBasic();
		searchNote.phoneNumber = $scope.phoneNumber.value;
		console.log(searchNote);
		NotesBasic.query(searchNote, function (results){
			if(results.length > 0){
				console.log(results[0]);
				$scope.basicInfo[0].value = results[0].studentName.first;
				$scope.basicInfo[1].value = results[0].studentName.last;
				$scope.basicInfo[2].value = results[0].schoolName;
				$scope.basicInfo[3].value = results[0].graduationYear;
				$scope.basicInfo[4].value = results[0].gpa;

			}
			else{
				alert("Phone Number Does Not Exist");
			}
		});
	}

	$scope.createNewNote = function() {
		var newNote = new NotesBasic();
		console.log(newNote);
		newNote.phoneNumber = "7143158255";
		newNote.studentName = { first: "Matin", last: "Fouladi"};
		newNote.schoolName = "FPA"
		newNote.gpa = "4.0";
		newNote.graduationYear = "2010";

		newNote.$save(function(result){
			console.log(result);
		});
	}

}]);