'use strict';

var gulp = require('gulp'),
    watch = require('gulp-watch'),
    twig = require('gulp-twig'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    sourcemaps = require('gulp-sourcemaps'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    csso = require('gulp-csso');


// Переменная с конфигом для browserSync
var config = {
    server: {
        baseDir: "./build"
    },
    // tunnel: true,
    host: 'localhost',
    port: 8000,
    logPrefix: "mesaki",
    startPath: "/views/home/"
};


// BROWSERSYNC
gulp.task('server', function () {
    browserSync(config);
});


// TWIG
gulp.task('twig', function () {
    var g = require("./globals");
    gulp.src('./individual/views/**/*.twig')
        .pipe(twig(g.twigConfig))
        .pipe(gulp.dest('./build/views'))
        .pipe(reload({stream: true}));
});


// CSS
gulp.task('css', function(){
    gulp.src('./individual/public/scss/**/main.scss')
        .pipe(sourcemaps.init({debug: true, identityMap: true}))
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer({
            browsers: ['last 10 versions'],
            cascade: false
        }))
        .pipe(csso())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('./build/public/css'))
        .pipe(gulp.dest('./individual/public/css'))
        .pipe(reload({stream: true}))
});

// JS TASK
gulp.task('js', function(){
    gulp.src('./individual/public/js/**/*.js')
        .pipe(gulp.dest('./build/public/js'))
        .pipe(reload({stream: true}));
});

// IMAGES TASK
gulp.task('images', function() {
    gulp.src('./individual/public/images/**/*.*')
        .pipe(gulp.dest('./build/public/images'))
        .pipe(reload({stream: true}));
});

// FONTS TASK
gulp.task('fonts', function() {
    gulp.src('./individual/public/fonts/**/*.*')
        .pipe(gulp.dest('./build/public/fonts'))
        .pipe(reload({stream: true}));
});

// LIBS TASK
gulp.task('libs', function () {
    gulp.src('./individual/public/libs/**/*')
        .pipe(gulp.dest('./build/public/libs'))
        .pipe(reload({stream: true}));
});

// BUILD
gulp.task('build', [
    'twig',
    'js',
    'css',
    'fonts',
    'images',
    'libs'
]);

// WATCH
gulp.task('watch', function(){
    watch('./individual/views/**/*.twig', function() {
        gulp.start('twig');
    });
    watch(['./individual/public/scss/**/*.scss', './individual/public/scss/**/*.css'], function() {
        gulp.start('css');
    });
    watch('./individual/public/js/**/*.js', function() {
        gulp.start('js');
    });
    watch('./individual/public/images/**/*.*', function() {
        gulp.start('images');
    });
    watch('./individual/public/fonts/**/*.*', function() {
        gulp.start('fonts');
    });
    watch('./individual/public/libs/**/*.*', function() {
        gulp.start('libs');
    });
});

// DEFAULT TASK
gulp.task('default', ['build', 'server', 'watch']);

