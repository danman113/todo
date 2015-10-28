var fs = require("fs");
var http = require("http");
var path = require("path");
var body=require("body-parser");
module.exports = function(app, database){
	var server=http.Server(app);
	app.use(body.json());
	app.use(body.urlencoded({ extended: true }));
	fs.readdir(path.join(".","routes"), function(err, files){
		if(!err){
			console.log(files);
			for (var i = 0; i < files.length; i++) {
				var info = path.parse(files[i]).ext;
				if(info === ".js"){
					var route = require(path.join("..","routes",files[i]));
					if(route){
						app.use("/",route(database));
						console.log("Used route "+files[i]);
					}
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