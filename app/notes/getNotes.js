var notes = angular.module('notesModule', []);

notes.service('notesModel', ['$http',  function ($http) {
	var model = this;
	model.getNotes = function () {
		return $http({
			method: 'GET',
			url: 'http://2evoke.com/projman/backend/getNotes.php',
			params: {"uName": "ProjManApp", "pass": "ProjMan2015"}
		})
				.then(function(result){
					var data = result.data;
					var today = new Date();
					for (var x in data) {
						data[x].due = new Date(Date.parse(data[x].due));

						switch (data[x].who) {
							case '123':
								data[x].text += " (All)";
								break;
							case '1':
								data[x].text += " (AS)";
								break;
							case '2':
								data[x].text += " (RR)";
								break;
							case '3':
								data[x].text += " (GR)";
								break;
						}
					}
					return data;
				});
	}}]);

notes.service('newNoteModel', ['$http', function ($http) {
	var model = this;

	model.addNote = function (newNote) {
		newNote.uName = "ProjManApp";
		newNote.pass = "ProjMan2015";
		return $http({
			method: 'POST',
			url: 'http://2evoke.com/projman/backend/newNote.php',
			data: newNote
		})

				.then(function (result) {
					var data = result.data;
					if (data.status === 0) {
						console.log("Operation Unsuccessful");
					}
				});
	}
}]);

notes.service('checkNoteModel', ['$http', function ($http) {
	var model = this;

	model.checkNote = function (note) {
		note.uName = "ProjManApp";
		note.pass = "ProjMan2015";
		return $http({
			method: 'POST',
			url: 'http://2evoke.com/projman/backend/checkNote.php',
			data: note
		})

				.then(function (result) {
					var data = result.data;
					if (data.status === 0) {
						console.log("Operation Unsuccessful");
					}
				});
	}
}]);

