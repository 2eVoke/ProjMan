var app = angular.module("app", ['projectsModule', 'notesModule']);

app.directive("header", function () {
	return {
		restrict: "E",
		templateUrl: "common/header.html"
	};
});

app.directive("content", function () {
	return {
		restrict: "E",
		templateUrl: "common/content.html"
	};
});

app.directive("spinner", function () {
	return {
		restrict: "E",
		templateUrl: "common/spinner.html"
	};
});

app.directive("addProject", function () {
	return {
		restrict: "E",
		templateUrl: "projects/newProject.html"
	};
});

app.directive("editProject", function () {
	return {
		restrict: "E",
		templateUrl: "projects/editProject.html"
	};
});

app.controller('appCtrl',
	['$scope', 'projectsModel', 'notesModel', 'newProjectModel', 'updateProjectModel', '$timeout',
		function ($scope, projectsModel, notesModel, newProjectModel, updateProjectModel, $timeout) {
			var app = this;

			app.showSpinner = true;
			app.toggleSpinner = function () {
				app.showSpinner = !app.showSpinner;
			};

			app.showToast = false;
			app.toastMessage = "I am toast";
			app.toast = function (message) {
				app.toastMessage = message;
				app.showToast = true;
				$timeout(1000)
					.then(function () {
						app.showToast = false;
					});
			};

			projectsModel.getProjects()
				.then(function (result) {
					app.projects = result;
					app.toggleSpinner();
				});

			app.projectOrder = ['-rate', 'title'];
			app.projectReverse = false;
			app.projectOrderCaret = "fa-caret-down";
			app.chProjectOrder = function (order) {
				if (JSON.stringify(app.projectOrder) === JSON.stringify(order)) {
					app.projectReverse = !app.projectReverse;
				} else {
					app.projectOrder = order;
					app.projectReverse = false;
				}
				(app.projectReverse) ?
					app.projectOrderCaret = "fa-caret-up" :
					app.projectOrderCaret = "fa-caret-down";
			};

			app.isProjectOrder = function (order) {
				return JSON.stringify(app.projectOrder) === JSON.stringify(order);
			};

			app.projectFilter = {'state': '1'};
			app.chProjectFilter = function (item, value) {
				if (app.projectFilter[item] === value) {
					app.projectFilter[item] = '';
				} else {
					app.projectFilter[item] = value;
				}
			};

			app.activeFilter = function (item, value) {
				return app.projectFilter[item] === value;
			};


			notesModel.getNotes()
				.then(function (result) {
					app.notes = result;
				});

			app.showAddProject = false;
			app.toggleShowAddProject = function () {
				app.showAddProject = !app.showAddProject;
				window.scrollTo(0, 0);
			};

			app.showEditProject = false;
			app.toggleShowEditProject = function () {
				app.showEditProject = !app.showEditProject;
				window.scrollTo(0, 0);
			};

			app.newProject = {};

			app.addProject = function (newProject) {
				app.toggleSpinner();
				newProjectModel.addProject(newProject)
					.then(function success() {
						return projectsModel.getProjects();
					}, function error() {
						alert("Oops... Something went wrong!");
					})
					.then(function success(result) {
						app.projects = result;
						app.toggleShowAddProject();
						app.toggleSpinner();
						app.toast("Project Added");
						app.newProject = {};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

			app.openProject = {};
			app.editProject = function (project) {
				app.openProject = angular.copy(project);
				app.toggleShowEditProject();
			};


			app.updateProject = function (openProject) {
				app.toggleSpinner();
				updateProjectModel.updateProject(openProject)
					.then(function success() {
						return projectsModel.getProjects();
					}, function error() {
						alert("Oops... Something went wrong!");
					})
					.then(function success(result) {
						app.projects = result;
						app.toggleShowEditProject();
						app.toggleSpinner();
						app.toast("Project Updated");
						app.openProject = {};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

		}]);


/* DIRECTIVE DECLARATION ***************************************************
 app.directive("DIRECTIVE", function () {
 return {
 restrict: "E",
 templateUrl: "TEMPLATE.html"
 };
 });
 */
