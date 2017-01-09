const path = require('path')
const gulp   = require('gulp')
const pug   = require('gulp-pug')
const uglify = require('gulp-uglify')
const cssmin = require('gulp-cssmin')
const less   = require('gulp-less')
const sass   = require('gulp-sass')
const rename = require('gulp-rename')
const concat = require('gulp-concat')
const merge  = require('merge-stream')
const autoprefixer = require('gulp-autoprefixer')
const babel = require('gulp-babel')

//

/**
 * JSON DATA
 */
const DATA = require('./env.json')
const Vendors = {
  "scripts": [
    "node_modules/jquery/dist/jquery.min.js",
    "node_modules/foundation-sites/dist/js/foundation.min.js",
    // "node_modules/approvejs/dist/approve.min.js", form validation if needed
    // "node_modules/lightbox2/dist/js/lightbox.min.js", useful
    // "node_modules/blazy/blazy.min.js", lazy load
  ],
  "styles":[
    "node_modules/foundation-sites/dist/css/foundation.min.css",
    "node_modules/lightbox2/dist/css/lightbox.min.css",
  ],
}

const paths = {
  public:    'public/',
  base_pug:  'source/pug',
  pug:       'source/pug/*.pug',
  js:        'source/js/*.js',
  base_less: 'source/less/',
  less:      'source/less/main.less',
  img:       'source/statics/images/**',
  fonts:     'source/statics/fonts/**',
  serverScripts: 'source/bin/**',
}

gulp.task('copy_server_scripts', () => {
  return gulp.src(paths.serverScripts)
    .pipe(gulp.dest(paths.public + 'bin'))
})

/**
 * Copy vendors statics assets and standalone scripts
 */
gulp.task('copy_vendors_and_statics', () => {
  // Copy fonts statics
  gulp.src(paths.fonts)
    .pipe(gulp.dest( paths.public + 'fonts'))

  // Copy static images
  gulp.src(paths.img)
  .pipe(gulp.dest( paths.public + 'images'))

  // Isolate Gmaps used only on some pages
  gulp.src("./node_modules/gmaps/gmaps.min.js")
  .pipe(gulp.dest(paths.public + 'js'))

  // Lightbox statics
  gulp.src("./node_modules/lightbox2/dist/images/**")
    .pipe(gulp.dest(paths.public + 'images'))

  // Copy .htaccess
  gulp.src(path.resolve('./source/.htaccess'))
    .pipe(gulp.dest(paths.public))
})

/**
 * Compile pug templates
 */
gulp.task('compile_pug_template', () => {
  return gulp.src(paths.pug)
    .pipe(pug({
       locals: DATA
    }))
    .pipe(gulp.dest(paths.public))
})

/**
 * Compile and minify styles
 */
gulp.task('compile_minify_LESS', () => {
  return gulp.src(paths.less)
    .pipe(less())
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(autoprefixer({
      browsers: ['last 2 versions'],
      cascade: false
    }))
    .pipe(gulp.dest(paths.public + 'css'))
})

/**
 * Compile Scripts
 */
gulp.task('user_scripts', () => {
  return gulp.src(paths.js)
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public + 'js'))
})

/**
 * Concat & Uglify vendors
 */
gulp.task('concat_minify_scripts', () => {
  return gulp.src(Vendors.scripts)
    .pipe(concat('vendors.js'))
    .pipe(rename({suffix:'.min'}))
    .pipe(gulp.dest(paths.public + 'js'))
})

gulp.task('concat_minify_styles', () => {
  return gulp.src(Vendors.styles)
    .pipe(concat('vendors.css'))
    .pipe(cssmin())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.public + 'css'))
})


// DEV WATCHER
gulp.task('watch', () => {
  gulp.watch(paths.js, ['user_scripts'])
  gulp.watch('source/pug/**/*.pug', ['compile_pug_template'])
  gulp.watch(paths.base_less + '**/**', ['compile_minify_LESS'])
  gulp.watch(paths.serverScripts, ['copy_server_scripts'])
})

gulp.task('default', ['copy_server_scripts', 'concat_minify_styles', 'concat_minify_scripts', 'copy_vendors_and_statics', 'user_scripts', 'compile_minify_LESS', 'compile_pug_template'])
gulp.task('dev', ['watch'])
