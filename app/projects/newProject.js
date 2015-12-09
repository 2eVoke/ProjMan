var projects = angular.module('projectsModule', []);

projects.service('projectsModel', ['$http',  function ($http) {
	var model = this;
	model.getProjects = function () {
		return $http({
			method: 'GET',
			url: 'http://2evoke.com/projman/backend/getProjects.php',
			params: {"uName": "ProjManApp", "pass": "ProjMan2015"}
		})
			.then(function(result){
				var data = result.data;
				for (var x in data) {
					switch (data[x].rate) {
						case '1':
							data[x].color = "blue";
							break;
						case '2':
							data[x].color = "green";
							break;
						case '3':
							data[x].color= "orange";
							break;
						case '4':
							data[x].color = "red";
							break;
					}
				}
				return data;
			});
	}}]);
