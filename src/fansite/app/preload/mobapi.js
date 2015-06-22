'use strict';

var BaseApi = 'http://localhost:2700/';

var MobApi = {
	method: function (methodName) {
		var uri = BaseApi + 'api/' + methodName + '.json';
		return uri;
	},
	template: function (templateName) {
		var uri = BaseApi + 'templates/' + templateName + '.html';
		return uri;
	}
};

module.exports = MobApi;