var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	uglify = require('gulp-uglify'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename');

gulp.task('scripts', function (){
	gulp.src(config.src.js.modules)
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())
		.pipe(sourcemaps.init())
		.pipe(uglify())
		.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug());
});