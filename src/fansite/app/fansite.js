function Fansite() {
	var id = null;
	var name = null;
	var picture = null;

	this.updateView = function () {
		var tags = document.getElementsByTagName('mob');
		document.title = this.name || 'Carregando';

		for (var i = 0; i < tags.length; i++) {
			var element = tags[i];
			this.renderElement(element);
		}
	}

	this.renderPicture = function (element) {
		if (this.picture) {
			item.innerHTML = '<img src="' + this.picture + '" alt="' + (this.name || 'Imagem') + '"/>';
		} else {
			item.innerHTML = '';
		}
	}

	this.renderElement = function (element) {
		var type = element.getAttribute('type');

		switch (type) {
			case 'picture':
				this.renderPicture(element);
				break;

			default:
				break;
		}
	}
};

Fansite.prototype.set = function (obj) {
	this.id = obj.id;
	this.name = obj.name;
	this.picture = obj.picture;
	this.updateView();
}

module.exports = Fansite;