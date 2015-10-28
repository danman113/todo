var router = require('express').Router();
module.exports=function(database){
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
	router.get("/list/:id",function(req, res){
		database.user.findOne({name:req.params.id}).then(function(data){
			res.send(JSON.stringify(data));
		},function(err){
			console.log(err);
			res.send(null);
		});
	});
	router.post("/list/:id",function(req, res){
		database.user.update({},{$push:{}},{safe: true, upsert: true, new : true});
		var todo = [{text:"Go to class",creationDate:new Date(),checked:false},{text:"Buy Ice-cream",creationDate:new Date(),checked:false},{text:"Take out the trash",creationDate:new Date(),checked:false}];
		res.send(JSON.stringify(todo));
	});
	router.put("/list/:id",function(req, res){
		console.log("Update contents of list");
		var todo = [{text:"Go to class",creationDate:new Date(),checked:false},{text:"Buy Ice-cream",creationDate:new Date(),checked:false},{text:"Take out the trash",creationDate:new Date(),checked:false}];
		res.send(JSON.stringify(todo));
	});
	router.delete("/list/:id",function(req, res){
		console.log("Deletes a list");
		var todo = [{text:"Go to class",creationDate:new Date(),checked:false},{text:"Buy Ice-cream",creationDate:new Date(),checked:false},{text:"Take out the trash",creationDate:new Date(),checked:false}];
		res.send(JSON.stringify(todo));
	});
	
	return router;
};