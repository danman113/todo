var fs = require("fs");
var http = require("http");
var path = require("path");
module.exports = function(app, database){
	var server=http.Server(app);
	fs.readdir(path.join(".","routes"), function(err, files){
		if(!err){
			console.log(files);
			for (var i = 0; i < files.length; i++) {
				var info = path.parse(files[i]).ext;
				if(info === ".js"){
					var route= require(path.join("..","routes",files[i]))(database);
					app.use("/",route);
					console.log("Used route "+files[i]);
				} else {
					console.log("Non-js file in routes directory");
				}
			}
		} else {
			console.error("Error reading file");
		}
	});
	server.listen(8000, function(){
		console.log("Server Started");
	});
	return {};
};