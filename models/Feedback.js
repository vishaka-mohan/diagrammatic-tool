const mongoose = require('mongoose');
var	passportLocalMongoose = require("passport-local-mongoose");

var feedbackSchema =  new mongoose.Schema({
	userEmail : String,
	title : String,	
	content: String
	
});

feedbackSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("feedback", feedbackSchema);