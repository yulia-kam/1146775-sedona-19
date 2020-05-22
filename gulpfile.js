"use strict";

var gulp = require("gulp");
var plumber = require("gulp-plumber");
var sourcemap = require("gulp-sourcemaps");
var less = require("gulp-less");
var postcss = require("gulp-postcss");
var autoprefixer = require("autoprefixer");
var server = require("browser-sync").create();
var csso = require('gulp-csso');

gulp.task("css", function () {
  return gulp.src("source/less/style.less")
    .pipe(plumber())
    .pipe(sourcemap.init())
    .pipe(less())
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(sourcemap.write("."))
    .pipe(gulp.dest("source/css"))
    .pipe(csso())
    .pipe(gulp.dest("build/css"))
    .pipe(server.stream());
});


gulp.task("fonts", function () {
  return gulp.src("source/fonts/*")
    .pipe(gulp.dest("build/fonts"))
    .pipe(server.stream());
});

gulp.task("html-o", function () {
  return gulp.src("source/*.html")
    .pipe(gulp.dest("build"))
    .pipe(server.stream());
});

gulp.task("images", function () {
  return gulp.src("source/img/*")
    .pipe(gulp.dest("build/img"))
    .pipe(server.stream());
});


gulp.task("server", function () {
  server.init({
    server: "source/",
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch("source/less/**/*.less", gulp.series("css"));
  gulp.watch("source/*.html").on("change", server.reload);
});

gulp.task("build", gulp.series("css", "fonts", "images", "html-o"));
gulp.task("start", gulp.series("css", "fonts", "html-o", "images", "server"));
