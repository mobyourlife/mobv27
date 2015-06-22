'use strict';

var MobApi = {
	method: function (methodName) {
		var uri = 'http://localhost:2700/api/' + methodName + '.json';
		return uri;
	}
};

module.exports = MobApi;