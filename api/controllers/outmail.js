var moment = require('moment-timezone');

var Outmail = require('../models/outmail');

module.exports = {
	postNewMail: function (req, res) {
		var mail = new Outmail({
			ref: req.params.fansite,
			time: moment().tz('UTC'),
			sender_name: req.body.params.name,
			sender_email: req.body.params.email,
			message: req.body.params.message
		});

		console.log(mail);

		mail.save(function (err) {
			if (err) {
				res.status(500).send();
				throw err;
			}

			res.status(200).send();
		});
	}
};