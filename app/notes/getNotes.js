






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

