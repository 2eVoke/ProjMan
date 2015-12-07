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

app.directive("addProject", function () {
	return {
		restrict: "E",
		templateUrl: "projects/addProject.html"
	};
});

app.controller('appCtrl', ['$scope', 'projectsModel', 'notesModel', function ($scope, projectsModel, notesModel) {
	var app = this;
	projectsModel.getProjects()
		.then(function (result) {
			app.projects = result;
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
	app.toggleAddProject = function() {
		app.showAddProject = !app.showAddProject;
	}

}]);


/* DIRECTIVE DECLARATION ***************************************************
 app.directive("DIRECTIVE", function () {
 return {
 restrict: "E",
 templateUrl: "TEMPLATE.html"
 };
 });
 */
