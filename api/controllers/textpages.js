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
	}
};