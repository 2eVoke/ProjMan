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
					return data;
				});
	}}]);

