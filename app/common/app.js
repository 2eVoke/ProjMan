var app = angular.module("app", []);

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






/* DIRECTIVE DECLARATION ***************************************************
app.directive("DIRECTIVE", function () {
	return {
		restrict: "E",
		templateUrl: "TEMPLATE.html"
	};
});
*/
