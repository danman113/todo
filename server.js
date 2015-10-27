console.log("TODO Started");
var app = require("express")();
var database = require("./lib/database.js")(app);
var router = require("./lib/router.js")(app, database);

