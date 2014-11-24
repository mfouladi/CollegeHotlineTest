app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	var NotesBasic = $resource('/api/notes/basic');
	var NotesBasicCreate = $resource('/api/notes/basic/create');
	var NotesBasicUpdate = $resource('/api/notes/basic/update'); 
	var NotesBasicUpdateShortGoals = $resource('/api/notes/basic/updateShortGoals');
	var NotesBasicUpdateLongGoals = $resource('/api/notes/basic/updateLongGoals');
	$scope.goals = [];
	$scope.ltgoals = [];

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
				$scope.goals = results[0].goals;
				$scope.ltgoals = results[0].ltgoals;
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
				$scope.phoneNumberSearch = newNote.phoneNumber;

				newNote.$save(function(result){
					$scope.phoneNumber = '';
					$scope.firstName = '';
					$scope.lastName = '';
					$scope.schoolName = '';
					$scope.currentYear = '';
					while ($scope.goals.length > 0) {
						$scope.goals.pop();
					}
					while ($scope.ltgoals.length > 0) {
						$scope.ltgoals.pop();
					}
					$scope.phoneSearch();
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
					$scope.phoneSearch();

				});
			}
		});
		
	}

	$scope.createNewGoal = function(){
		NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
			if(results.length == 0){
				//need alert to handle cases where user not found
			}
			else
			{
				var updateNoteShortGoals = new NotesBasicUpdateShortGoals();
				console.log($scope.newGoal);
				updateNoteShortGoals.phoneNumber = $scope.phoneNumber;
				updateNoteShortGoals.goals = $scope.newGoal;
				updateNoteShortGoals.$save(function(result){
					console.log(result);
					$scope.goals.push({body: $scope.newGoal});
					$scope.newGoal = '';
				});
			}	
		});
	}

	$scope.createNewLTGoal = function(){
		NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
			if(results.length == 0){
				//need alert to handle cases where user not found
			}
			else
			{
				var updateNoteLongGoals = new NotesBasicUpdateLongGoals();
				console.log($scope.newGoal);
				updateNoteLongGoals.phoneNumber = $scope.phoneNumber;
				updateNoteLongGoals.ltgoals = $scope.newLTGoal;
				updateNoteLongGoals.$save(function(result){
					console.log(result);
					$scope.ltgoals.push({body: $scope.newLTGoal});
					$scope.newLTGoal = '';
				});
			}	
		});
	}

}]);