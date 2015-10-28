var mongoose = require("mongoose");
module.exports = function(){
	var returnObj = {};
	
	mongoose.connect("mongodb://localhost/todo");
	
	var database = mongoose.connection;
	
	//Exits server if cannot connect to db, the
	//app relies on it so exiting is the only way to go
	database.on('error', function(){
		console.error("Error connecting to database!");
		process.exit(1);
	});

	//Alerts of successful connection
	database.once('open', function (callback) {
		console.log("Successfully connected to database!");
	});

	//Schema for user
	var userSchema=mongoose.Schema({
		name:String,
		todo:[{name:String,creationDate:Date,checked:Boolean}]
	});
	
	//sets up schema
	returnObj.user=mongoose.model('user',userSchema);
	returnObj.database = database;
	
	//returns object with schema and database info
	return returnObj;
};