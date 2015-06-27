var Fanpage = require('../models/fanpage');

module.exports = {
	getProfile: function (req, res) {
		Fanpage.findOne({ _id: req.params.fansite }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
};