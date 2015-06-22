'use strict';

function Fansite() {
	/* attributes */
	var id = null;
	var name = null;
	var picture = null;

	/* callbacks */
	var onChanged = null;
};

Fansite.prototype.set = function (obj) {
	this.id = obj.id;
	this.name = obj.name;
	this.picture = obj.picture;

	if (this.onChanged) {
		this.onChanged(this);
	}
}

Fansite.prototype.changed = function (callback) {
	this.onChanged = callback;
}

module.exports = Fansite;