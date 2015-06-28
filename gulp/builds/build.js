var gulp = require('gulp');

gulp.task('build', [
	'browserify',
	'extras',
	'html',
	'images',
	'sass',
	'fontmob'
	//'styles'
]);