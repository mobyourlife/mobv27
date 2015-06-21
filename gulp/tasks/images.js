var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	imagemin = require('gulp-imagemin'),
	livereload = require('gulp-livereload');

gulp.task('images', function (){
	gulp.src(config.src.images)
		.pipe(imagemin())
		.pipe(gulp.dest(config.dist.images))
		.pipe(debug())
		.pipe(livereload());
});