app.controller('list', ['$scope','$http','$location', function($scope,$http, $location) {
	var vm = $scope;
	vm.loading = true;
	vm.user = null;
	vm.requestedList = $location.path().split("/")[$location.path().split("/").length-1];
	vm.newTask = "";
	console.log(vm.requestedList);
	$http.get("/list/"+vm.requestedList).then(
	function(data){
		vm.loading = false;
		if(data.data==="null"){
			console.log("Could not find user");
		} else {
			console.log("User found");
			vm.user = data.data;
			for (var i = data.data.length - 1; i >= 0; i--) {
				data.data[i].edit = false;
			}
			console.log(data);
		}
	},
	function(err){
		console.log(err);
	});
	vm.addNewTask = function(){
		if(vm.newTask){
			vm.user.todo.push({name:vm.newTask, checked:false, creationDate:new Date(), edit:false});
			vm.newTask="";
		}
	};
	vm.check = function(i){
		if(i<vm.user.todo.length){
			vm.user.todo[i].checked = !vm.user.todo[i].checked;
		}
	};
	vm.edit = function(i){
		console.log("dfsadf");
		if(i<vm.user.todo.length){
			vm.user.todo[i].edit = !vm.user.todo[i].edit;
		}
	};
}]);