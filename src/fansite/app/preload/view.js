'use strict';

function View() {
	//
};

View.prototype.updateView = function (scope) {
	var tags = document.getElementsByTagName('mob');

	for (var i = 0; i < tags.length; i++) {
		var tag = tags[i];

		if (tag.attributes['type']) {
			this.renderElement(tag, scope);
		}
	}
}

View.prototype.renderElement = function (tag, scope) {
	var renderCondition = tag.attributes['if'].value;

	/* evaluate rendering condition */
	if (renderCondition) {
		if (!scope[renderCondition]) {
			tag.innerHTML = '';
			return;
		}
	}

	/* create new DOM element */
	var element = document.createElement(tag.attributes['type'].value);

	/* set CSS class */
	if (tag.attributes['class']) {
		element.setAttribute('class', tag.attributes['class'].value);
	}

	/* set inner HTML */
	if (tag.attributes['inner']) {
		element.innerHTML = scope[tag.attributes['inner'].value];
	}

	/* set all other attributes */
	for (var i = 0; i < tag.attributes.length; i++) {
		var atb = tag.attributes[i];
		if (atb.name.substring(0, 5) === 'attr-') {
			element.setAttribute(atb.name.substring(5), scope[atb.value]);
		}
	}

	tag.appendChild(element);
}

module.exports = View;