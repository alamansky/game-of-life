var gulp = require('gulp'),
	changed = require('gulp-changed'),
	debug = require('gulp-debug'),
	path = require('path'),
	merge = require('merge-stream');
//require generic gulp modules

function handleError(error) {
	console.log(error.toString());
	this.emit('end');
}
//allows gulp to continue running after an error has been thrown

var sass = require('gulp-sass'),
	sourcemaps = require('gulp-sourcemaps'),
	postcss = require('gulp-postcss'),
	postcssPresetEnv = require('postcss-preset-env'),
	cssnano = require('cssnano');
//require CSS gulp modules

gulp.task('css', function () {
	return gulp.src('./src/Components/**/*.scss', { base: './' })
		.pipe(sourcemaps.init())
		.pipe(sass().on('error', sass.logError))
		.on('error', handleError)
		.pipe(postcss([postcssPresetEnv, cssnano({
			preset: ['default', { discardComments: { removeAll: true } }]
		})]))
		.pipe(sourcemaps.write('./maps'))
		.pipe(gulp.dest('.'));
});
//css task, transpiles css in-place with error handling, sourcemapping and minification

gulp.task('watch', function () {
	gulp.watch('./src/**/*.scss', ['css']);
});
//Watch task: calls the css task

gulp.task('default', ['watch']);
