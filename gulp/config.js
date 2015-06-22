var bower = './bower_components/';
var src = './src/fansite/';
var dist = './dist/fansite/';

module.exports = {
	src: {
		extras: [
			'./src/favicon.ico'
		],
		html: src + '/**/*.html',
		images: src + '/images/**/*.*',
		js: src + '/app/app.js',
		sass: src + 'sass/*.{sass,scss}'
	},

	dist: {
		extras: dist,
		html: dist,
		images: dist + 'images/',
		js: dist + 'js/',
		css: dist + 'css/'
	},

	includes: {
		sass: [
			bower + './bootstrap-sass/assets/stylesheets/'
		]
	}
};