var app = angular.module('todo', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller:"index",
		templateUrl: "public/views/index.html"
	})
	.when('/window/', {
		controller:"index",
		templateUrl: '/public/views/window.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});