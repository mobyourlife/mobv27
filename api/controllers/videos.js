var Video = require('../models/video');

module.exports = {
	getVideos: function (req, res) {
		Video.find({ ref: req.params.fansite }).sort({ time: -1 }).limit(5).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
}