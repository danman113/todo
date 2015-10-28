var router = require('express').Router();
module.exports=function(database){

	//Creates new user
	router.post("/list",function(req, res){
		if(req.body){
			if(req.body.newName){
				var userSchema = {
					name:req.body.newName,
					list:[]
				};
				var newList = new database.user(userSchema);
				newList.save();
				res.send({result:true,error:null});
				console.log("created new user"+req.body.newName);
				return true;
			}
		}
		res.send({result:false,error:"Invalid post data"});
	});

	//Gets user data based on id
	router.get("/list/:id",function(req, res){
		database.user.findOne({name:req.params.id}).then(function(data){
			res.send(JSON.stringify(data));
		},function(err){
			console.log(err);
			res.send(null);
		});
	});

	//Adds task to selected user
	router.post("/list/:id",function(req, res){
		console.log(req.body);
		database.user.update({name:req.params.id},{$push:{todo:{name:req.body.name,date: new Date(), checked:false}}},{safe: true, upsert: true, new : true}).then(function(data){
			console.log(data);
			console.log("Added task");
			res.send(true);
		}, function(err){
			console.log(err);
			res.send(false);
		});
	});

	//Updates task for selected user
	router.put("/list/:id",function(req, res){
		var update = {};
		update['todo.'+req.body.id]={checked:req.body.check,date:new Date(req.body.date),name:req.body.name}; 
		database.user.update({name:req.params.id},update,{safe: true, upsert: true, new : true}).then(function(data){
			console.log(data);
			res.send(true);
		}, function(err){
			res.send(false);
		});
	});
	
	return router;
};