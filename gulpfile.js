var gulp   = require('gulp');
var jade   = require('gulp-jade');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var less   = require('gulp-less');
var sass = require('gulp-sass');
var rename = require('gulp-rename');

var DATA = require('./static_data.json');


var paths = {
  jade : 'src/jade/**',
  js   : 'src/js/**',
  less : 'src/less/main.less',
  img  : 'src/psd/images/**',
  fonts: 'src/psd/fonts/**',
};

/**
 * COMPILE VENDORS
 */
 
gulp.task('compile_vendors', function () {

  gulp.src('node_modules/foundation/scss/foundation.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'));
    
  gulp.src(paths.fonts)
    .pipe(gulp.dest('fonts'));

  gulp.src(paths.img)
    .pipe(gulp.dest('images'));
});



gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({
       locals: DATA
    }))
    .pipe(gulp.dest('./'))
});

gulp.task('less_and_minify', function() {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('css'))
});

gulp.task('scripts', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('js'));  
});



// Rerun the task when a file changes 
gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(['src/less/**'], ['less_and_minify']);
  gulp.watch(paths.jade, ['jade']);
});


gulp.task('default', ['compile_vendors', 'watch', 'jade', 'scripts','less_and_minify']);

