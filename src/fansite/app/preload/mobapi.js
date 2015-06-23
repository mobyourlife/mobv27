'use strict';

var BaseStatic = 'http://localhost:2700/';
var BaseServer = 'http://localhost:2700/';

var MobApi = {
	cache: function (methodName) {
		var uri = BaseStatic + 'cache/' + methodName + '.json';
		return uri;
	},
	template: function (templateName) {
		var uri = BaseStatic + 'templates/' + templateName + '.html';
		return uri;
	},
	method: function (methodName) {
		var uri = BaseServer + 'api/' + methodName + '.json';
		return uri;
	}
};

module.exports = MobApi;