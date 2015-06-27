var Feed = require('../models/feed');

module.exports = {
	getFeeds: function (req, res) {
		Feed.find({ ref: req.params.fansite }).sort({ time: -1 }).limit(5).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
}