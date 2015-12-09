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

app.directive("settings", function () {
	return {
		restrict: "E",
		templateUrl: "common/settings.html"
	};
});

app.controller('appCtrl',
	['$scope', '$location', '$anchorScroll', 'projectsModel', 'notesModel', 'newProjectModel', 'updateProjectModel', 'newNoteModel', 'checkNoteModel', '$timeout',
		function ($scope, $location, $anchorScroll, projectsModel, notesModel, newProjectModel, updateProjectModel, newNoteModel, checkNoteModel, $timeout) {
			var app = this;

			app.settings = window.localStorage;

			app.today = new Date();
			app.dueDate = new Date();
			app.dueDate.setDate(app.today.getDate() + 7);

			app.showSpinner = true;
			app.toggleSpinner = function () {
				app.showSpinner = !app.showSpinner;
			};

			app.showToast = false;
			app.toastMessage = "I am a toast";
			app.toast = function (message) {
				app.toastMessage = message;
				app.showToast = true;
				$timeout(1000)
					.then(function () {
						app.showToast = false;
					});
			};

			app.getData = function(){
				projectsModel.getProjects()
						.then(function (result) {
							app.projects = result;
							app.toggleSpinner();
						});
				notesModel.getNotes()
						.then(function (result) {
							app.notes = result;
						});
			};

			app.getData();

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

			app.activeProject = '';
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

			app.newProject = {'user':app.settings.user};

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
						app.activeProject = "anchor" + app.projects[result.length - 1].id;
						$location.hash(app.activeProject);
						$anchorScroll();
						app.toggleSpinner();
						app.toast("Project Added");
						app.newProject = {'user':app.settings.user};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

			app.openProject = {'user':app.settings.user};
			app.editProject = function (project) {
				app.openProject = angular.copy(project);
				app.activeProject = "anchor" + app.openProject.id;
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
						$location.hash(app.activeProject);
						$anchorScroll();
						app.toggleSpinner();
						app.toast("Project Updated");
						app.openProject = {'user':app.settings.user};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};
			app.newNote = {'due': app.dueDate};

			app.showAddNote = false;
			app.toggleShowAddNote = function (pID) {
				app.newNote.pID = pID;
				app.showAddNote = !app.showAddNote;
				window.scrollTo(0, 0);
			};

			app.addNote = function (newNote) {
				app.activeProject = "anchor" + newNote.pID;
				app.toggleSpinner();
				app.newNote.user = app.settings.user;
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
						$location.hash(app.activeProject);
						$anchorScroll();
						app.toggleSpinner();
						app.toast("Note Added");
						app.newNote = {'due': app.today};
					}, function error() {
						alert("Oops... Something went wrong!");
					});
			};

			app.checkNote = function (nID) {
				var note = {'id': nID},
					nIndex = nID - 1;
				if (app.notes[nIndex].state !== '0') {
					checkNoteModel.checkNote(note);
					app.notes[nIndex].state = '0';
				}
			};

			(!app.settings.user) ? app.showSettings = true : app.showSettings = false;
			app.toggleShowSettings = function () {
				app.showSettings = !app.showSettings;
					window.scrollTo(0, 0);
			};



		}]);

