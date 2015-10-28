var router = require('express').Router();
module.exports=function(database){
	router.post("/body",function(req, res){
		console.log(req.body);
		var todo = [{text:"Go to class",creationDate:new Date(),checked:false},{text:"Buy Ice-cream",creationDate:new Date(),checked:false},{text:"Take out the trash",creationDate:new Date(),checked:false}];
		res.send(JSON.stringify(todo));
	});
	return router;
};