var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug'),
	concat = require('gulp-concat'),
	minify = require('gulp-minify-css'),
	sourcemaps = require('gulp-sourcemaps'),
	rename = require('gulp-rename'),
	livereload = require('gulp-livereload');

gulp.task('fontmob-css', function() {
	gulp.src([
			'./extras/fontello*/css/fontmob.css',
			'./extras/fontello*/css/animation.css'
		])
		.pipe(concat('fontmob.css'))
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

gulp.task('fontmob-icons', function() {
	gulp.src('./extras/fontello*/font/fontmob.{eot,svg,ttf,woff}')
		.pipe(rename({ dirname: '' }))
		.pipe(gulp.dest(config.dist.fonts))
		.pipe(debug())
		.pipe(livereload());
});

gulp.task('fontmob', ['fontmob-css', 'fontmob-icons']);