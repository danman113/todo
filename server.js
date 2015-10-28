console.log("TODO Started");
//Inits express
var app = require("express")();
//Sets up mongodb database
var database = require("./lib/database.js")(app);
//Sets up router, starts server. Router reads all routes in 
//routes folder and adds to app
var router = require("./lib/router.js")(app, database);

