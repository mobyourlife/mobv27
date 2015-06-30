var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	browserify = require('gulp-browserify'),
	rename = require('gulp-rename'),
	ngAnnotate = require('gulp-ng-annotate'),
	uglify = require('gulp-uglify'),
	rename = require('gulp-rename'),
	sourcemaps = require('gulp-sourcemaps'),
	livereload = require('gulp-livereload'),
	replace = require('gulp-token-replace');

gulp.task('browserify_app', function () {
	gulp.src(config.src.js.app)
		.pipe(browserify())
		.pipe(replace(config.placeholders))
		.pipe(rename('app.js'))
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())
		/*.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.init())
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())*/
		.pipe(livereload());
});

gulp.task('browserify_preload', function () {
	gulp.src(config.src.js.preload)
		.pipe(browserify())
		.pipe(replace(config.placeholders))
		.pipe(rename('preload.js'))
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())
		/*.pipe(rename({
			suffix: '.min'
		}))
		.pipe(sourcemaps.init())
		.pipe(ngAnnotate())
		.pipe(uglify())
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())
		.pipe(sourcemaps.write('./'))
		.pipe(gulp.dest(config.dist.js))
		.pipe(debug())*/
		.pipe(livereload());
});

gulp.task('browserify', [
	'browserify_app',
	'browserify_preload'
]);