// app/models/outmail.js
// load dependencies
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

// define the model schema
var outmailSchema = mongoose.Schema({
	ref: {
		type: String,
		ref: 'Fanpage'
	},
	time: Date,
	sender_name: String,
	sender_email: String,
	message: String,
	sent: Date,
	failure: Date,
	err_msg: String
});

// export mailing model
module.exports = mongoose.model('Outmail', outmailSchema);