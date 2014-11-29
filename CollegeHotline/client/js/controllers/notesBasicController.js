app.controller('notesBasicController',['$scope', '$resource', function ($scope, $resource) {

	var NotesBasic = $resource('/api/notes/basic');
	var NotesBasicCreate = $resource('/api/notes/basic/create');
	var NotesBasicUpdate = $resource('/api/notes/basic/update'); 
	var NotesBasicUpdateShortGoals = $resource('/api/notes/basic/updateShortGoals');
	var NotesBasicUpdateLongGoals = $resource('/api/notes/basic/updateLongGoals');
	var NotesBasicSaveQuestion1 = $resource('/api/notes/basic/saveQuestion1');
	var NotesBasicSaveQuestion2 = $resource('/api/notes/basic/saveQuestion2');

	var NotesBasicLoad = $resource('/api/notes/load');


	$scope.goals = [];
	$scope.ltgoals = [];

	
	var phoneSearch = function(){
		var searchNote = new NotesBasic();
		searchNote.phoneNumber = $scope.phoneNumberSearch;
		if (searchNote.phoneNumber != null && searchNote.phoneNumber !== undefined) {
        	
		NotesBasic.query(searchNote, function (results){
			if(results.length > 0){

				$scope.phoneNumber = results[0].phoneNumber;
				$scope.firstName = results[0].studentName.first;
				$scope.lastName = results[0].studentName.last;
				$scope.schoolName = results[0].schoolName;
				$scope.currentYear = results[0].currentYear;
				$scope.studentAddress = results[0].studentAddress;
				$scope.goals = results[0].goals;
				$scope.ltgoals = results[0].ltgoals;
			}
			else{
				alert("Phone Number Does Not Exist. Please Fill Out Basic Info and Submit.");
				$scope.phoneNumber = $scope.phoneNumberSearch;
			}
		});
		}
		else{
			alert("Phone Number Does Not Exist. Please Fill Out Basic Info and Submit.");
		}
	}


	$scope.loadCaller = function(){
		NotesBasicLoad.query(new NotesBasic(), function(results){
			console.log(results);
			console.log(results[0]);

			$scope.phoneNumberSearch = results[0].currentCall;
			console.log($scope.phoneNumberSearch);
			phoneSearch();
		})
	}

	$scope.phoneSearch = phoneSearch;

	$scope.createNewNote = function() {
		NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
			if(results.length == 0){
				var newNote = new NotesBasicCreate();
				newNote.phoneNumber = $scope.phoneNumber;
				newNote.studentName = { first: $scope.firstName, last: $scope.lastName};
				newNote.schoolName = $scope.schoolName;
				newNote.currentYear = $scope.currentYear;
				newNote.studentAddress = $scope.studentAddress;
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
				newNote.studentAddress = $scope.studentAddress;


				newNote.$save(function(result){
					$scope.phoneNumber = '';
					$scope.firstName = '';
					$scope.lastName = '';
					$scope.schoolName = '';
					$scope.currentYear = '';
					$scope.studentAddress = '';

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

	$scope.saveQuestion1 = function(){
		if(!$scope.question1.match(/\S/)){
			//do nothing
			console.log("empty")
		}
		else{
			NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
				if(results.length == 0){
					//need alert to handle cases where user not found
				}
				else if(results[0].question1.length != 0 &&  results[0].question1[0].body == $scope.question1){
					//do nothing
				}
				else{
					var updateNoteLongGoals = new NotesBasicSaveQuestion1();
					updateNoteLongGoals.phoneNumber = $scope.phoneNumber;
					updateNoteLongGoals.question1 = $scope.question1;
					updateNoteLongGoals.$save(function(result){
						console.log(result);
					});
				}	
			});
		}
	}

	$scope.saveQuestion2 = function(){
		if(!$scope.question1.match(/\S/)){
			//do nothing
			console.log("empty")
		}
		else{
			NotesBasic.query({phoneNumber : $scope.phoneNumber}, function (results){
				if(results.length == 0){
						//need alert to handle cases where user not found
				}
				else if(results[0].question2.length != 0 &&  results[0].question2[0].body == $scope.question2){
					//do nothing
				}
				else
				{
					var updateNoteLongGoals = new NotesBasicSaveQuestion2();
					updateNoteLongGoals.phoneNumber = $scope.phoneNumber;
					updateNoteLongGoals.question2 = $scope.question2;
					updateNoteLongGoals.$save(function(result){
						console.log(result);
					});
				}	
			});
		}
	}


}]);