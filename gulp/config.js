var server = require('../config');

var bower = './bower_components/';
var src = './src/fansite/';
var dist = './dist/fansite/';

module.exports = {
	src: {
		css: src + 'css/**/*.css',
		extras: [
			'./src/favicon.ico'
		],
		html: src + '/**/*.html',
		images: src + '/images/**/*.*',
		js: {
			all: src + '/app/**/*.js',
			app: src + '/app/app.js',
			preload: src + '/app/preload.js'
		},
		sass: src + 'sass/*.{sass,scss}'
	},

	dist: {
		extras: dist,
		fonts: dist + 'font/',
		html: dist,
		images: dist + 'images/',
		js: dist + 'js/',
		css: dist + 'css/'
	},

	includes: {
		sass: [
			bower + './bootstrap-sass/assets/stylesheets/'
		]
	},

	placeholders: {
		prefix: '{#',
		suffix: '#}',
		tokens: {
			config: server
		}
	}
};