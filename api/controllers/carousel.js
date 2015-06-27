var Album = require('../models/album');
var Photo = require('../models/photo');

module.exports = {
	getCarousel: function (req, res) {
		Album.findOne({ ref: req.params.fansite, special: 'banner' }, function (err, one) {
			if (err) {
				throw err;
			}

			if (!one) {
				return;
			}

			Photo.find({ album_id: one._id }, function (err, data) {
				if (err) {
					throw err;
				}

				var ret = [];
				for (var i = 0; i < data.length; i++) {
					ret.push({ index: i, image: data[i].source });
				}

				res.json(ret);
			});
		});
	}
};