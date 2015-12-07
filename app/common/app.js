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

app.controller('appCtrl', ['$scope', 'projectsModel', 'notesModel', function ($scope, projectsModel, notesModel) {
	var app = this;
	projectsModel.getProjects()
		.then(function (result) {
			app.projects = result;
		});

	app.projectOrder = ['-rate', 'title'];
	app.projectReverse = false;
	app.chProjectOrder = function (order) {
		if (JSON.stringify(app.projectOrder) === JSON.stringify(order)) {
			app.projectReverse = !app.projectReverse;
		} else {
			app.projectOrder = order;
			app.projectReverse = false;
		}

	};

	app.projectFilter = {'state':'1'};
	app.chProjectFilter = function (item, value) {
		if (item === 'reset') {
			app.projectFilter = {};
		} else {
			if (app.projectFilter[item] === value) {
				app.projectFilter[item] = '';
			} else {
				app.projectFilter[item] = value;
			}
		}
	};


	notesModel.getNotes()
			.then(function (result) {
				app.notes = result;
			});

}]);


/* DIRECTIVE DECLARATION ***************************************************
 app.directive("DIRECTIVE", function () {
 return {
 restrict: "E",
 templateUrl: "TEMPLATE.html"
 };
 });
 */
