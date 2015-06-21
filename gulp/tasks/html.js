var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	minify = require('gulp-minify-html'),
	livereload = require('gulp-livereload');

gulp.task('html', function (){
	gulp.src(config.src.html)
		.pipe(minify({
			conditionals: true,
			spare: true
		}))
		.pipe(gulp.dest(config.dist.html))
		.pipe(debug())
		.pipe(livereload());
});