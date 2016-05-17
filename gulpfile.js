'use strict';

const gulp = require('gulp');
const cssmin = require('gulp-clean-css');
const concatcss = require('gulp-concat-css');
const autoprefixer = require('gulp-autoprefixer');
const htmlmin = require('gulp-htmlmin');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const uglify = require('gulp-uglify');
const webpack = require('webpack-stream');
const runSequence = require('run-sequence');
const del = require('del');

const config = {
    webpack: {
        config: './webpack.config.js'
    },
    app: {
        watch: './app/**/*.js',
        src: './app/index.js',
        dest: './dist/assets/js/'
    },
    css: {
        src: './src/**/*.css',
        dest: './dist/assets/css'
    },
    fonts: {
        src: './src/assets/fonts/**/*',
        dest: './dist/assets/fonts'
    },
    html: {
        src: './src/**/*.html',
        dest: './dist/'
    }
};

gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('app', function () {
    return gulp.src(config.app.src)
        .pipe(plumber())
        .pipe(webpack(require(config.webpack.config)))
        .pipe(uglify())
        .pipe(gulp.dest(config.app.dest))
});

gulp.task('fonts', function(){
    return gulp.src(config.fonts.src)
        .pipe(gulp.dest(config.fonts.dest, {overwrite: true}));
});

gulp.task('css', function () {
    return gulp.src(config.css.src)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concatcss('style.css'))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssmin({relativeTo: './dist/assets', root: './dist'}))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(config.css.dest));
});

gulp.task('html', function () {
    return gulp.src(config.html.src)
        .pipe(htmlmin({collapseWhitespace:true}))
        .pipe(gulp.dest(config.html.dest));
});

gulp.task('watch', ['default'], function(){
    gulp.watch(config.app.watch, ['app']);
    gulp.watch(config.css.src, ['css']);
    gulp.watch(config.html.src, ['html']);
});

gulp.task('test', function(){
    console.log('No tests yet');
});

gulp.task('default', function () {
    runSequence('clean', ['app', 'fonts', 'css', 'html']);
});

