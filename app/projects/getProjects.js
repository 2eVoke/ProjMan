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
							case '0':
								data[x].rate = "blue";
								break;
							case '1':
								data[x].rate = "green";
								break;
							case '2':
								data[x].rate= "orange";
								break;
							case '3':
								data[x].rate = "red";
								break;
						}
					}
					return data;
				});
}}]);



/*
app.controller('projectController', ['$scope', '$http', '$mdDialog', '$mdMedia', '$sce',
	function ($scope, $http, $mdDialog, $mdMedia, $sce) {
		$scope.getProjects = function getProjects() {
			$http({
				method: 'GET',
				url: 'http://winecult.org/get.projects.php'
			})
					.success(function (data) {
						console.log (data);
						$scope.projects = data;
						for (x in data) {
							switch (data[x].type) {
								case 'client':
									data[x].icon = "folder";
									break;
								case 'prospect':
									data[x].icon = "folder_open";
									break;
								case 'job':
									data[x].icon = "assignment";
									break;
								case 'project':
									data[x].icon = "dashboard";
									break;
							} //icons
						}
					})
					.error(function (error) {
						console.log(error);
					});
		};
		$scope.getProjects();
	}]);
*/