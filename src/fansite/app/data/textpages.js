angular.module('MobYourLife.Data')

.service('TextPagesApi', function (BaseApi) {
	this.getTextPages = function (args) {
		var promise = BaseApi.getApi('textpages', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}

	this.getPageBody = function (page, args) {
		var promise = BaseApi.getApi('textpages/' + page, args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}

	this.saveTextPage = function (pageid, title, body) {
		var uri = 'textpages' + (pageid ? '/' + pageid : '');
		var args = { title: title, body: body };
		var promise = BaseApi.postApi(uri, args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});