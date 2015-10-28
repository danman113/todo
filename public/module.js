var app = angular.module('todo', ['ngRoute']);

app.config(function ($routeProvider) {
	$routeProvider
	.when('/', {
		controller:"index",
		templateUrl: "public/views/index.html"
	})
	.when('/list/:id', {
		controller:"list",
		templateUrl: '/public/views/list.html'
	})
	.otherwise({
		redirectTo: '/'
	});
});