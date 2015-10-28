app.controller('index', ['$scope','$http','$location', function($scope, $http, $location) {
	var vm = $scope;
	vm.newList = "";
	vm.oldList = "";
	vm.newListInvalid = false;
	vm.oldListInvalid = false;
	vm.checkList = function(id,result){
		if(id){
			$http.get("/list/"+id).then(
			function(data){
				if(data.data==="null"){
					vm[result] = false;
				} else {
					vm[result] = true;
				}
			},
			function(err){
				console.log(err);
			});	
		}
	};
	vm.createNewList = function(){
		if(!vm.newListInvalid){
			$http.post("/list",{newName:vm.newList}).then(
			function(data){
				if(data.data.result){
					console.log("Successful list creation");
					$location.path("/list/"+vm.newList);
				}
			},
			function(err){
				console.log(err);
			});	
		}
	};
	vm.loadOld = function(){
		if(vm.oldListInvalid){
			$location.path("/list/"+vm.oldList);
		}
	};

	vm.$watch('newList',function(){vm.checkList(vm.newList,'newListInvalid');});
	vm.$watch('oldList',function(){vm.checkList(vm.oldList,'oldListInvalid');});
}]);