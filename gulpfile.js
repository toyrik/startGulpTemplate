const gulp = require('gulp');
const concat = require('gulp-concat');
const autoprefixer = require('gulp-autoprefixer');
const cleanCSS = require('gulp-clean-css');
const del = require('del');
const browserSync = require('browser-sync').create();

const patch = {
	cssFiles: [
    './dev/css/*.css'
    ],

	jsFiles: [
    './dev/js/*.js'
    ],

	htmlFiles: [
    './dev/*.html'
    ],

  imgFiles: [
  	'./dev/img/*.*'
  ]
  
};

function styles() {
  return gulp.src(patch.cssFiles)
    .pipe(concat('style.css'))
    .pipe(autoprefixer({
      browsers: ['>0.1%'],
      cascade: false
    }))
    .pipe(cleanCSS({
     level: 2
    }))
    .pipe(gulp.dest('./out/css'))
    .pipe(browserSync.stream());
}


function scripts() {
  return gulp.src(patch.jsFiles)
    .pipe(gulp.dest('./out/js'))
    .pipe(browserSync.stream());
}

function html() {
  return gulp.src(patch.htmlFiles)
    .pipe(gulp.dest('./out'))
    .pipe(browserSync.stream());
}

function img() {
  return gulp.src(patch.imgFiles)
    .pipe(gulp.dest('./out/img/'));
}

function watch() {
  browserSync.init({
          server: {
              baseDir: "./out"
          }
      });
  gulp.watch(patch.cssFiles, styles);
  gulp.watch(patch.jsFiles, scripts);
  gulp.watch(patch.imgFiles, img);
  gulp.watch(patch.htmlFiles, html).on('change', browserSync.reload);
}

function clear() {
  return del(['./out/*'])
}


gulp.task('styles', styles);
gulp.task('scripts', scripts);
gulp.task('watch', watch);

gulp.task('build', gulp.series(clear, gulp.parallel(styles, scripts, img, html)));
gulp.task('dev', gulp.series('build', watch));
