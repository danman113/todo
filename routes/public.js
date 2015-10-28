var router = require('express').Router();
var path = require('path');
var fs = require("fs");
var approvedFiletypes = ["js","png","json","jpg","jpeg","css","html"];
module.exports = function(){
	router.get("/public/*.:id",function(req, res){
		if(approvedFiletypes.indexOf(req.params.id)>=0){
			var pathname=req._parsedUrl.pathname.substring(1,req._parsedUrl.pathname.length);
			getFile(pathname,req,res);	
		} else {
			res.sendStatus(404);
		}
	});
	function getFile(pathname,req,res){
		var filePath = path.resolve("./"+pathname);
		fs.readFile(filePath,function(err,file){
			if(!err){
				res.sendFile(filePath);
			}else{
				res.sendStatus(404);
			}
		});
	}
	return router;
};

