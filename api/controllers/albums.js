var Album = require('../models/album');

module.exports = {
	getAlbums: function (req, res) {
		Album.find({ ref: req.params.fansite }).sort({ name: 1 }).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
};