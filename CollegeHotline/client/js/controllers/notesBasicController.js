app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	var NotesBasic = $resource('/api/notes/basic');
	var NotesBasicCreate = $resource('/api/notes/basic/create');
	var NotesBasicUpdate = $resource('/api/notes/basic/update'); 

	$scope.phoneSearch = function() {
		var searchNote = new NotesBasic();
		searchNote.phoneNumber = $scope.phoneNumberSearch;

		NotesBasic.query(searchNote, function (results){
			if(results.length > 0){

				$scope.phoneNumber = results[0].phoneNumber;
				$scope.firstName = results[0].studentName.first;
				$scope.lastName = results[0].studentName.last;
				$scope.schoolName = results[0].schoolName;
				$scope.currentYear = results[0].currentYear;
			}
			else{
				alert("Phone Number Does Not Exist");
			}
		});
	}

	$scope.createNewNote = function() {
		NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
			if(results.length == 0){
				var newNote = new NotesBasicCreate();
				newNote.phoneNumber = $scope.phoneNumber;
				newNote.studentName = { first: $scope.firstName, last: $scope.lastName};
				newNote.schoolName = $scope.schoolName;
				newNote.currentYear = $scope.currentYear;

				newNote.$save(function(result){
					$scope.phoneNumber = '';
					$scope.firstName = '';
					$scope.lastName = '';
					$scope.schoolName = '';
					$scope.currentYear = '';
				});
			}
			else
			{
				var newNote = new NotesBasicUpdate();
				newNote.phoneNumber = $scope.phoneNumber;
				newNote.studentName = { first: $scope.firstName, last: $scope.lastName};
				newNote.schoolName = $scope.schoolName;
				newNote.currentYear = $scope.currentYear;

				newNote.$save(function(result){
					$scope.phoneNumber = '';
					$scope.firstName = '';
					$scope.lastName = '';
					$scope.schoolName = '';
					$scope.currentYear = '';
				});
			}
		});
		
	}

}]);