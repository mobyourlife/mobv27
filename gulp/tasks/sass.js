var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	sass = require('gulp-sass'),
	minify = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload');

gulp.task('sass', function (){
	gulp.src(config.src.sass)
		.pipe(sass({
			includePaths: config.includes.sass
		}))
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