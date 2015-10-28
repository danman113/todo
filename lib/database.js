var mongoose = require("mongoose");
module.exports = function(){
	var returnObj = {};
	mongoose.connect("mongodb://localhost/todo");
	var database = mongoose.connection;
	database.on('error', function(){
		console.error("Error connecting to database!");
		process.exit(1);
	});
	database.once('open', function (callback) {
		console.log("Successfully connected to database!");
	});
	var userSchema=mongoose.Schema({
		name:String,
		todo:[{name:String,creationDate:Date,checked:Boolean}]
	});
	returnObj.user=mongoose.model('user',userSchema);
	returnObj.database = database;
	return returnObj;
};