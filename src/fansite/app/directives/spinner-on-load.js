angular.module('MobYourLife')

.directive('spinnerOnLoad', function() {
    return {
        restrict: 'A',
        link: function(scope, element) {
            element.on('load', function() {
                element.removeClass('spinner-hide');
                element.addClass('spinner-show');
                element.parent().find('span').remove();
            });
            scope.$watch(function() {
                return element.attr('src');
            }, function() {
                element.removeClass('spinner-show');
                element.addClass('spinner-hide');
                element.parent().append('<span class="spinner"></span>');
            });
        }
    }
});