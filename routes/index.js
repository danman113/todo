var router = require('express').Router();
module.exports=function(database, settings){
	router.get("/",function(req, res){
		res.send("Hi");
	});
	return router;
};