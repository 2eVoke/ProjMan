var projects = angular.module('projectsModule', []);

projects.service('projectsModel', ['$http', function ($http) {
	var model = this;
	model.getProjects = function () {
		return $http({
			method: 'POST',
			url: 'http://2evoke.com/projman/backend/getProjects.php',
			data: {"uName": "ProjManApp", "pass": "ProjMan2015"}
		})
			.then(function (result) {
					var data = result.data;
					if (data.status === 0) {
						console.log("No Data Returned");
					} else {
						for (var x in data) {
							switch (data[x].rate) {
								case '0':
									data[x].color = "blue";
									break;
								case '1':
									data[x].color = "green";
									break;
								case '2':
									data[x].color = "orange";
									break;
								case '3':
									data[x].color = "red";
									break;
							}
							switch (data[x].type) {
								case '0':
									data[x].icon = "folder";
									break;
								case '1':
									data[x].icon = "folder-o";
									break;
								case '2':
									data[x].icon = "archive";
									break;
								case '3':
									data[x].icon = "file";
									break;
							}
						}
						return data;
					}
				},
				function () {
					alert("Oops, can't seem to find the database. \n\nAre you online?");
				}
			);
	}
}]);

projects.service('newProjectModel', ['$http', function ($http) {
	var model = this;

	model.addProject = function (newProject) {
		newProject.uName = "ProjManApp";
		newProject.pass = "ProjMan2015";
		return $http({
			method: 'POST',
			url: 'http://2evoke.com/projman/backend/newProject.php',
			data: newProject
		})

				.then(function (result) {
					var data = result.data;
					if (data.status === 0) {
						console.log("Operation Unsuccessful");
					}
				});
	}

}]);

projects.service('updateProjectModel', ['$http', function ($http) {
	var model = this;

	model.updateProject = function (openProject) {
		openProject.uName = "ProjManApp";
		openProject.pass = "ProjMan2015";
		return $http({
			method: 'POST',
			url: 'http://2evoke.com/projman/backend/updateProject.php',
			data: openProject
		})

				.then(function (result) {
					var data = result.data;
					if (data.status === 0) {
						console.log("Operation Unsuccessful");
					}
				});
	}

}]);
