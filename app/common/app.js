var app = angular.module("app", ['ngTouch', 'projectsModule', 'notesModule']);

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

app.directive("addNote", function () {
	return {
		restrict: "E",
		templateUrl: "notes/newNote.html"
	};
});

app.directive("editProject", function () {
	return {
		restrict: "E",
		templateUrl: "projects/editProject.html"
	};
});

app.controller('appCtrl',
	['$scope', '$location', '$anchorScroll', 'projectsModel', 'notesModel', 'newProjectModel', 'updateProjectModel', 'newNoteModel', 'checkNoteModel', '$timeout',
		function ($scope, $location, $anchorScroll, projectsModel, notesModel, newProjectModel, updateProjectModel, newNoteModel, checkNoteModel, $timeout) {
			var app = this;

			app.settings = window.localStorage;

			app.settings.foo = "Bar";
			console.log(app.settings.foo);

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

			app.activeProject = '';
			console.log("aProj set to ''");
			$anchorScroll.yOffset = 100;

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
						app.activeProject = app.projects[result.length-1].id;
						console.log("aProj set to:" + app.activeProject);
						$location.hash("anchor" + app.activeProject);
						console.log("location set to:" + $location.hash());
						$anchorScroll();
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
				app.activeProject = app.openProject.id;
				console.log("aProj set to:" + app.activeProject);
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
						$location.hash("anchor" + app.activeProject);
						console.log("location set to:" + $location.hash());
						$anchorScroll();
						app.toggleSpinner();
						app.toast("Project Updated");
						app.openProject = {};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

			app.newNote = {};

			app.showAddNote = false;
			app.toggleShowAddNote = function (pID) {
				app.newNote.pID = pID;
				app.showAddNote = !app.showAddNote;
				window.scrollTo(0, 0);
			};

			app.addNote = function (newNote) {
				app.activeProject = newNote.pID;
				console.log("aProj set to: " + app.activeProject);
				app.toggleSpinner();
				newNoteModel.addNote(newNote)
					.then(function success() {
						return notesModel.getNotes();
					}, function error() {
						alert("Oops... Something went wrong!");
					})
					.then(function success(notes) {
						app.notes = notes;
					}, function error() {
						alert("Oops... Something went wrong!");
					})
					.then(function success() {
						return projectsModel.getProjects();
					}, function error() {
						alert("Oops... Something went wrong!");
					})
					.then(function success(projects) {
						app.projects = projects;
						app.toggleShowAddNote();
						$location.hash("anchor" + app.activeProject);
						console.log("location set to:" + $location.hash());
						$anchorScroll();
						app.toggleSpinner();
						app.toast("Note Added");
						app.newNote = {};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

			app.checkNote = function (nID) {
				var note = {'id': nID},
					nIndex = nID - 1;
				if (app.notes[nIndex].state !== '0') {
					console.log("working");
					checkNoteModel.checkNote(note);
					app.notes[nIndex].state = '0';
				}
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
