'use strict';

const gulp          = require('gulp');
const htmlmin       = require('gulp-htmlmin');
const plumber       = require('gulp-plumber');
const sourcemaps    = require('gulp-sourcemaps');
const uglify        = require('gulp-uglify');
const webpack       = require('webpack-stream');

gulp.task('default', ['app', 'css', 'html']);
