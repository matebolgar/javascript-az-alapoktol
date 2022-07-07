"use strict"; // Load plugins

var autoprefixer = require("gulp-autoprefixer");

var browsersync = require("browser-sync").create();

var cleanCSS = require("gulp-clean-css");

var del = require("del");

var gulp = require("gulp");

var header = require("gulp-header");

var merge = require("merge-stream");

var plumber = require("gulp-plumber");

var rename = require("gulp-rename");

var sass = require("gulp-sass");

var uglify = require("gulp-uglify"); // Load package.json for banner


var pkg = require('./package.json'); // Set the banner content


var banner = ['/*!\n', ' * Start Bootstrap - <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>)\n', ' * Copyright 2013-' + new Date().getFullYear(), ' <%= pkg.author %>\n', ' * Licensed under <%= pkg.license %> (https://github.com/BlackrockDigital/<%= pkg.name %>/blob/master/LICENSE)\n', ' */\n', '\n'].join(''); // BrowserSync

function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: "./"
    },
    port: 3000
  });
  done();
} // BrowserSync reload


function browserSyncReload(done) {
  browsersync.reload();
  done();
} // Clean vendor


function clean() {
  return del(["./vendor/"]);
} // Bring third party dependencies from node_modules into vendor directory


function modules() {
  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*').pipe(gulp.dest('./vendor/bootstrap/js')); // Font Awesome CSS

  var fontAwesomeCSS = gulp.src('./node_modules/@fortawesome/fontawesome-free/css/**/*').pipe(gulp.dest('./vendor/fontawesome-free/css')); // Font Awesome Webfonts

  var fontAwesomeWebfonts = gulp.src('./node_modules/@fortawesome/fontawesome-free/webfonts/**/*').pipe(gulp.dest('./vendor/fontawesome-free/webfonts')); // jQuery Easing

  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js').pipe(gulp.dest('./vendor/jquery-easing')); // jQuery

  var jquery = gulp.src(['./node_modules/jquery/dist/*', '!./node_modules/jquery/dist/core.js']).pipe(gulp.dest('./vendor/jquery'));
  return merge(bootstrapJS, fontAwesomeCSS, fontAwesomeWebfonts, jquery, jqueryEasing);
} // CSS task


function css() {
  return gulp.src("./scss/**/*.scss").pipe(plumber()).pipe(sass({
    outputStyle: "expanded",
    includePaths: "./node_modules"
  })).on("error", sass.logError).pipe(autoprefixer({
    cascade: false
  })).pipe(header(banner, {
    pkg: pkg
  })).pipe(gulp.dest("./css")).pipe(rename({
    suffix: ".min"
  })).pipe(cleanCSS()).pipe(gulp.dest("./css")).pipe(browsersync.stream());
} // JS task


function js() {
  return gulp.src(['./js/*.js', '!./js/*.min.js']).pipe(uglify()).pipe(header(banner, {
    pkg: pkg
  })).pipe(rename({
    suffix: '.min'
  })).pipe(gulp.dest('./js')).pipe(browsersync.stream());
} // Watch files


function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
} // Define complex tasks


var vendor = gulp.series(clean, modules);
var build = gulp.series(vendor, gulp.parallel(css, js));
var watch = gulp.series(build, gulp.parallel(watchFiles, browserSync)); // Export tasks

exports.css = css;
exports.js = js;
exports.clean = clean;
exports.vendor = vendor;
exports.build = build;
exports.watch = watch;
exports["default"] = build;