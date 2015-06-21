var bower = './bower_components/';
var src = './src/';
var dist = './dist/';

module.exports = {
	src: {
		sass: src + 'fansite/sass/*.{sass,scss}'
	},

	dist: {
		css: dist + 'fansite/css/'
	},

	includes: {
		sass: [
			bower + './bootstrap-sass/assets/stylesheets/'
		]
	}
};