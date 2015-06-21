var config = require('../config'),
	gulp = require('gulp'),
	debug = require('gulp-debug');

gulp.task('extras', function (){
	gulp.src(config.src.extras)
		.pipe(gulp.dest(config.dist.extras))
		.pipe(debug());
});