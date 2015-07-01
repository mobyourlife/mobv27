var Album = require('../models/album');

module.exports = {
	getAlbumPages: function (req, res) {
		Album.find({ ref: req.params.fansite, special: 'page', count: { $gt: 0 }  }, { name: 1, path: 1 }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
};