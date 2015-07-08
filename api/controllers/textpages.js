var validator = require('validator');

var helpers = require('../lib/helpers');

var TextPage = require('../models/textpage');

module.exports = {
	getTextPages: function (req, res) {
		TextPage.find({ ref: req.params.fansite }, { path: 1, title: 1 }, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	getPageBody: function (req, res) {
		var filter = {
			ref: req.params.fansite
		};

		if (validator.isMongoId(req.params.path)) {
			filter._id = req.params.path;
		} else {
			filter.path = req.params.path;
		}

		TextPage.findOne(filter, {
			body: 1,
			path: 1,
			title: 1
		}, function (err, data) {
			if (err) {
				throw err;
			}

			res.json(data);
		});
	},
	newTextPage: function (req, res) {
		var obj = new TextPage();
		obj.ref = req.params.fansite;
		obj.title = req.body.params.title;
		obj.path = helpers.formatAsPath(obj.title);
		obj.body = req.body.params.body;

		/* check whether the given path is being used */
		TextPage.find({ ref: req.params.fansite, path: obj.path }, function (err, records) {
			if (err) {
				throw err;
			}

			/* path name currently exists */
			if (records && records.length > 0) {
				res.status(409).send();
				return;
			}

			/* creates new text page */
			obj.save(function (err) {
				if (err) {
					throw err;
				}

				res.status(200).send();
			});
		});
	},
	editTextPage: function (req, res) {
		var obj = {};
		obj.title = req.body.params.title;
		obj.path = helpers.formatAsPath(obj.title);
		obj.body = req.body.params.body;

		/* check whether the given path is being used by another page */
		TextPage.find({ ref: req.params.fansite, _id: { $ne: req.params.pageid }, path: obj.path }, function (err, records) {
			if (err) {
				throw err;
			}

			/* path name currently exists */
			if (records && records.length > 0) {
				res.status(409).send();
				return;
			}

			/* saves edited text page */
			TextPage.update({ _id: req.params.pageid }, obj, function (err) {
				if (err) {
					throw err;
				}

				res.status(200).send();
			});
		});
	},
	deleteTextPage: function (req, res) {
		TextPage.remove({ ref: req.params.fansite, _id: req.params.pageid }, function (err) {
			if (err) {
				throw err;
			}

			res.status(200).send();
		});
	}
};