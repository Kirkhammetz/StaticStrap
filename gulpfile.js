var gulp   = require('gulp');
var jade   = require('gulp-jade');
var uglify = require('gulp-uglify');
var cssmin = require('gulp-cssmin');
var less   = require('gulp-less');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

/**
 * JSON DATA
 */
var DATA = require('./env.json'),
    Vendors = {
      scripts: DATA.vendors.scripts,
      styles: DATA.vendors.styles,
    }


var paths = {
  public : 'dist/',
  jade   : 'src/jade/*.jade',
  js     : 'src/js/*.js',
  less   : 'src/less/main.less',
  img    : 'src/statics/images/**',
  fonts  : 'src/statics/fonts/**',
};

/**
 * COMPILE VENDORS
 */

gulp.task('compile_and_copy_vendors', function () {

  gulp.src(Vendors.styles)
    .pipe(concat('vendors.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public + 'css'));

  gulp.src(paths.fonts)
    .pipe(gulp.dest(paths.public + 'fonts'));

  gulp.src(paths.img)
    .pipe(gulp.dest(paths.public + 'images'));
});



gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade({
       locals: DATA
    }))
    .pipe(gulp.dest(paths.public))
});

gulp.task('less_and_minify', function() {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public + 'css'))
});

gulp.task('scripts', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public + 'js'));
});


gulp.task('concat_vendors', function() {
  gulp.src(Vendors.scripts)
    .pipe(concat('vendors.js'))
    .pipe(uglify())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.public + 'js'));

  gulp.src(Vendors.styles)
    .pipe(concat('vendors.css'))
    .pipe(cssmin())
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.public + 'css'));
});


// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.js, ['scripts']);
  gulp.watch(['src/**/**'], ['compile_and_copy_vendors', 'scripts', 'concat_vendors','less_and_minify', 'jade']);
});

gulp.task('default', ['compile_and_copy_vendors', 'watch', 'scripts', 'concat_vendors','less_and_minify', 'jade']);
gulp.task('dev', ['compile_and_copy_vendors', 'jade', 'scripts', 'concat_vendors','less_and_minify', 'jade',]);
