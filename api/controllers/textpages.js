var helpers = require('../lib/helpers');

var TextPage = require('../models/textpage');

module.exports = {
	getTextPages: function (req, res) {
		TextPage.find({ ref: req.params.fansite }, { path: 1, title: 1 }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	getPageBody: function (req, res) {
		TextPage.findOne({ ref: req.params.fansite, path: req.params.page }, { body: 1, path: 1, title: 1 }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	newTextPage: function (req, res) {
		var page = new TextPage();
		page.ref = req.params.fansite;
		page.title = req.body.params.title;
		page.path = helpers.formatAsPath(page.title);
		page.body = req.body.params.body;

		page.save(function (err) {
			if (err) {
				throw err;
			}

			res.status(200).send();
		});
	},
	editTextPage: function (req, res) {
		//
	}
};