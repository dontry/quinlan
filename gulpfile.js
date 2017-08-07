/*
 * @Author: dontry
 * @Date:   2017-08-06 22:20:00
 * @Last Modified by:   dontry
 * @Last Modified time: 2017-08-07 23:06:09
 */

'use strict';

let gulp = require('gulp'),
    gutil = require('gulp-util'),
    compass = require('gulp-compass'),
    connect = require('gulp-connect'),
    gulpif = require('gulp-if'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    minifyHTML = require('gulp-minify-html'),
    path = require('path');

let env,
    jsSrc,
    sassSrc,
    htmlSrc,
    fontSrc,
    cssSrc,
    outputDir,
    sassStyle;

env = 'dist';

if (env === 'dev') {
    outputDir = 'builds/dev/';
    sassStyle = 'expanded';
} else {
    outputDir = 'docs/';
    sassStyle = 'compressed'
}

jsSrc = [
    'scripts/*.js'
]

sassSrc = ['styles/style.scss'];
htmlSrc = ['*.html'];
fontSrc = ['assets/fonts/*'];
cssSrc = ['styles/*.css'];

gulp.task('js', function() {
    gulp.src(jsSrc)
        .pipe(concat('bundle.js'))
        .on('error', gutil.log)
        .pipe(gulpif(env === 'dist', uglify()))
        .pipe(gulp.dest(outputDir + 'scripts'))
        .pipe(connect.reload())
});

gulp.task('compass', function() {
    gulp.src(sassSrc)
        .pipe(compass({
                sass: 'styles',
                css: outputDir + 'styles',
                image: outputDir + 'assets/img',
                style: sassStyle,
                require: ['susy', 'breakpoint']
            })
            .on('error', gutil.log))
        //    .pipe(gulp.dest( outputDir + 'css'))
        .pipe(connect.reload())
});

gulp.task('watch', function() {
    gulp.watch(jsSrc, ['js']);
    gulp.watch(['styles/*.scss', 'styles/*/*.scss', 'styles/*.css'], ['compass']);
    gulp.watch('*.html', ['html']);
});

gulp.task('connect', function() {
    connect.server({
        root: outputDir,
        livereload: true
    });
});

gulp.task('html', function() {
    gulp.src('*.html')
        .pipe(gulpif(env === 'dist', minifyHTML()))
        .pipe(gulp.dest(outputDir))
        .pipe(connect.reload())
});

gulp.task('icon', function() {
    gulp.src(fontSrc)
        .pipe(gulp.dest(outputDir + 'assets/fonts'))
});

gulp.task('css', function() {
    gulp.src(cssSrc)
        .pipe(gulp.dest(outputDir + 'styles'))
})

// Copy images to dist
gulp.task('move', function() {
    gulp.src('assets/img/**/*.*')
        .pipe(gulpif(env === 'dev', gulp.dest(outputDir + 'assets/img')))
        .pipe(gulpif(env === 'dist', gulp.dest(outputDir + 'assets/img')))
});

gulp.task('default', ['watch', 'html', 'js', 'compass', 'icon', 'css',
    'move', 'connect'
]);
