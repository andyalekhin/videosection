'use strict';

const gulp = require('gulp');
const plumber = require('gulp-plumber');
const sass = require('gulp-sass');
const browsersync = require("browser-sync").create();

const path = {
    public: {
        html: './public/',
        css: './public/css/',
        js: './public/js/',
        img: './public/img/'
    }
}


function browserSync(done) {
    browsersync.init({
        server: {
            baseDir: path.public.html
        },
        port: 3000
    });
    done();
}

function html() {
    return gulp.src('src/*.html')
        .pipe(plumber())
        .pipe(gulp.dest(path.public.html))
        .pipe(browsersync.stream())
}

function cssLibs() {
    return gulp.src([
        'node_modules/normalize.css/normalize.css',
    ])
        .pipe(gulp.dest(path.public.css))
}

function css() {
    return gulp.src('src/scss/style.scss')
        .pipe(plumber())
        .pipe(sass({
            outputStyle: 'expanded'
        }))
        .pipe(gulp.dest(path.public.css))
        .pipe(browsersync.stream())
}

function js() {
    return gulp.src('src/js/**/*')
        .pipe(plumber())
		.pipe(gulp.dest(path.public.js))
		.pipe(browsersync.stream())
}

function jsLibs() {
    return gulp.src([
        'node_modules/jquery/dist/jquery.min.js',
    ])
		.pipe(gulp.dest(path.public.js))
}

function img() {
    return gulp.src('src/img/**/*')
        .pipe(gulp.dest(path.public.img))
		.pipe(browsersync.stream())
}

function watch() {
    gulp.watch('src/*.html', html);
    gulp.watch("src/scss/**/*.scss", css);
    gulp.watch('src/js/**/*.js', js);
    gulp.watch('src/img/**/*', img);
}


exports.html = html;
exports.css = css;
exports.cssLibs = cssLibs;
exports.js = js;
exports.jsLibs = jsLibs;
exports.img = img;

exports.default = gulp.series(html, css, cssLibs, js, jsLibs, img, browserSync, watch);