var TextPage = require('../models/textpage');

module.exports = {
	getTextPages: function (req, res) {
		TextPage.find({ ref: req.params.fansite }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
};