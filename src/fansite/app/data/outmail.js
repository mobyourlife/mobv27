angular.module('MobYourLife.Data')

.service('OutmailApi', function (BaseApi) {
	this.postNewMail = function (args) {
		var promise = BaseApi.postApi('outmail', args)
			.then(function (response) {
				return response.data;
			});
		return promise;
	}
});