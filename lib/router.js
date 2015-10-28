var fs = require("fs");
var http = require("http");
var path = require("path");
var body=require("body-parser");
module.exports = function(app, database){
	
	//Sets up http server
	var server=http.Server(app);

	//Sets up body for post request
	app.use(body.json());
	app.use(body.urlencoded({ extended: true }));

	//Reads through routes folder for .js folder, then adds them to the 
	//main express app.
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

	//Makes server listen on port 8000
	server.listen(process.env.PORT || 8000, function(){
		console.log("Server Started on port 8000");
	});
	return {};
};