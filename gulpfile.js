const gulp = require('gulp');
const ts = require('gulp-typescript');
const tsConfig = require('./getTSCommonConfig')();

gulp.task('default', () => {
  return gulp.src([
    'src/**/*.ts',
    'src/**/*.tsx'
  ]).pipe(ts(tsConfig))
    .pipe(gulp.dest('lib'));
});