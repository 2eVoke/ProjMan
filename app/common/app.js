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

app.controller('appCtrl', ['$scope', function($scope) {
	$scope.content = [
		{"name": "Alf", "color": "red"},
		{"name": "Bob", "color": "grn"},
		{"name": "Ron", "color": "blu"},
		{"name": "Pol", "color": "pnk"}
	]
}]);




/* DIRECTIVE DECLARATION ***************************************************
app.directive("DIRECTIVE", function () {
	return {
		restrict: "E",
		templateUrl: "TEMPLATE.html"
	};
});
*/
