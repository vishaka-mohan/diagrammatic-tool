const mongoose = require('mongoose');
var	passportLocalMongoose = require("passport-local-mongoose");

var docSchema =  new mongoose.Schema({
	userEmail : String,
	docName : String,	
	content: String
	
});

docSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("docs", docSchema);