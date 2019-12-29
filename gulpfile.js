'use strict';

const gulp       = require('gulp'),
    watch        = require('gulp-watch'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS     = require('gulp-clean-css'),
    uglify       = require('gulp-uglify'),
    rename       = require('gulp-rename'),
    sass         = require('gulp-sass'),
    sourcemaps   = require('gulp-sourcemaps'),
    del          = require('del'),
    htmlmin      = require('gulp-htmlmin'),
    concat       = require('gulp-concat'),
    imagemin     = require('gulp-imagemin'),
    imgCompress  = require('imagemin-jpeg-recompress'),
    browserSync  = require("browser-sync").create()
;

// browserSync

function browser_sync(done) {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3000
    });

    done();

}

// scss to css

function scss(done) {

    gulp.src('src/style/*')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.reload({stream: true}));

    done();
}

// create all.min.js

function js(done) {
    gulp.src([
        'src/js/slick.min.js',
        'src/js/main.js',
        'src/js/request.js'

    ])
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build/js'));

    done();
}

// reload html,js

function browserReload(done) {
    browserSync.reload();
    done();
}

// Watch for all file changes

function watch_all(done) {

    gulp.watch('src/style/**/*.scss', gulp.parallel(scss));
    gulp.watch('src/js/**/*.js').on("change", browserSync.reload);
    gulp.watch('*.html').on('change', browserSync.reload);

    done();
}

// Optimize images

function img(done) {

    gulp.src('src/img/**/*')
        .pipe(imagemin([
            imgCompress({
                loops: 4,
                min: 70,
                max: 80,
                quality: 'high'
            }),
            imagemin.gifsicle(),
            imagemin.optipng(),
            imagemin.svgo()
        ]))
        .pipe(gulp.dest('build/img'));

    done();
}

// Cleaning Production distributive

gulp.task('clean', function (done) {
    del.sync('build/**');
    done();
});

// Build Production Site with all updates slick

// gulp.task('build', gulp.series('clean', scss, js, img));
gulp.task('build', gulp.series('clean', scss, img));

// Watch for all file changes during work

gulp.task('default', gulp.parallel(scss, browser_sync, watch_all));
