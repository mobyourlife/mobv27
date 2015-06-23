var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	minify = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload');

gulp.task('styles', function (){
	gulp.src(config.src.css)
		.pipe(gulp.dest(config.dist.css))
		.pipe(sourcemaps.init())
		.pipe(minify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dist.css))
		.pipe(debug())
		.pipe(livereload());
});