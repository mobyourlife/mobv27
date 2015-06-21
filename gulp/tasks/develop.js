var config = require('../config'),
	gulp = require('gulp'),
	nodemon = require('gulp-nodemon'),
	livereload = require('gulp-livereload');

gulp.task('develop', function () {
	livereload.listen();

	nodemon({
		script: 'bin/index.js',
		ext: 'js'
	}).on('restart', function () {
		setTimeout(function () {
			livereload.changed(__dirname);
		}, 2000);
	});
});