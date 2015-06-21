var config = require('../config'),
	gulp = require('gulp');

gulp.task('watch', function () {
	gulp.watch(config.src.html, ['html']);
	gulp.watch(config.src.js, ['browserify']);
	gulp.watch(config.src.sass, ['sass']);
});