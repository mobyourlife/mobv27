var Album = require('../models/album');

module.exports = {
	getAlbums: function (req, res) {
		Album.find({ ref: req.params.fansite }).sort({ name: 1 }).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	getAlbum: function (req, res) {
		Album.findOne({ ref: req.params.fansite, _id: req.params.albumid }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	setAlbumType: function (req, res) {
		var type = req.body.params.type;
		var before = function (cb) { cb(); };

		if (type === 'banner') {
			before = function (cb) {
				Album.update({ ref: req.params.fansite, special: type }, { $unset: { special: 1 } }, { multi: true }).exec(function (err) {
					cb();
				});
			}
		}

		before(function() {
			Album.update({ ref: req.params.fansite, _id: req.params.albumid },
				{ special: type }, function (err) {
					if (err) {
						throw err;
					}

					res.status(200).send();
				});
		});
	}
};