var Photo = require('../models/photo');

module.exports = {
	getFotos: function (req, res) {
		var args = {};
		args.ref = req.params.fansite;

		if (req.query.direction && req.query.ne && req.query.time) {
			args._id = { $ne: req.query.ne };
			args.time = { $lte: req.query.time };
		}

		if (req.query.page) {
			args.album_id = req.query.page;
		}

		Photo.find(args).sort({ time: -1 }).limit(5).exec(function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	}
}