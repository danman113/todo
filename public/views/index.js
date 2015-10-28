app.controller('index', ['$scope','$http','$location', function($scope,$http, $location) {
	$scope.newList = "";
	$scope.oldList = "";
	$scope.newListInvalid = false;
	$scope.oldListInvalid = false;
	$scope.checkList = function(id,result){
		if(id){
			$http.get("/list/"+id).then(
			function(data){
				if(data.data==="null"){
					$scope[result] = false;
				} else {
					$scope[result] = true;
				}
			},
			function(err){
				console.log(err);
			});	
		}
	};
	$scope.createNewList = function(){
		$http.post("/list",{newName:$scope.newList}).then(
		function(data){
			if(data.data.result){
				console.log("Successful list creation");
				$location.path("/list/"+$scope.newList);
			}
		},
		function(err){
			console.log(err);
		});
	};
	$scope.loadOld = function(){
		if($scope.oldListInvalid){
			$location.path("/list/"+$scope.oldList);
		}
	};

	$scope.$watch('newList',function(){$scope.checkList($scope.newList,'newListInvalid');});
	$scope.$watch('oldList',function(){$scope.checkList($scope.oldList,'oldListInvalid');});
}]);