var router = require('express').Router();
var path = require("path");
module.exports=function(database, settings){
	router.get("/",function(req, res){
		var hi = path.join(__dirname,"..","public","index.html");
		console.log(hi);
		res.sendFile(hi);
	});
	return router;
};