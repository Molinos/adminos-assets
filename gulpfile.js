const gulp = require('gulp');
const sass = require('gulp-sass');
const minifyCSS = require('gulp-csso');
const rename = require('gulp-rename');
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');

sass.compiler = require('node-sass');
const tildeImporter = require('node-sass-tilde-importer');

gulp.task('css', () => gulp.src('src/scss/adminos_base.scss')
  .pipe(sass({
    includePaths: ['./src/scss', "./node_modules"],
    importer: tildeImporter
  }).on('error', notify.onError()))
  .pipe(minifyCSS())
  .pipe(rename({
    basename: 'adminos',
    suffix: '.min',
  }))
  .pipe(gulp.dest('dist/css')));

gulp.task('js', () => gulp.src(['src/js/**/*.js'])
  .pipe(babel({
    presets: ['@babel/env'],
  }))
  .pipe(concat('adminos.js'))
  .pipe(gulp.dest('dist/js')));

gulp.task('js-min', () => gulp.src('dist/js/adminos.js')
  .pipe(rename({
    basename: 'adminos',
    suffix: '.min',
  }))
  .pipe(uglify())
  .pipe(gulp.dest('dist/js')));


gulp.task('build', ['css', 'js', 'js-min']);

gulp.task('watch', () => {
  gulp.watch('src/scss/**/*.scss', ['css']);
  gulp.watch('src/js/**/*.js', ['js']);
});

const tasks = {
  development: ['js', 'css', 'watch'],
  production: ['build'],
};

gulp.task('default', tasks[process.env.NODE_ENV] || 'fallback');
