var app = angular.module("app", ['projectsModule']);

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

app.controller('appCtrl', ['$scope', 'projectsModel', function ($scope, projectsModel) {
	var app = this;
	projectsModel.getProjects()
		.then(function (result) {
			app.projects = result;
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
