var Photo = require('../models/photo');

module.exports = {
	getFotos: function (req, res) {
		Photo.find({ ref: req.params.fansite }).sort({ time: -1 }).limit(5).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
}