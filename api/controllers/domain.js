var Domain = require('../models/domain');

module.exports = {
	getDomain: function (req, res) {
		Domain.findOne({ _id: req.params.name }, function (err, data) {
			if (err) {
				throw err;
			}

			if (data) {
				res.json(data);
			} else {
				Domain.findOne({ _id: 'www.' + req.params.name }, function (err, data) {
					if (err) {
						throw err;
					}

					res.json(data);
				});
			}
		});
	}
};
