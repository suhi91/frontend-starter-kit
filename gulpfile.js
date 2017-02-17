var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var notify = require('gulp-notify');
var minifycss = require('gulp-minify-css');
var concat = require('gulp-concat');
var plumber = require('gulp-plumber');
var browserSync = require('browser-sync');
var neat = require('node-neat').includePaths;

var reload = browserSync.reload;

/* Setup scss path */
var paths = {
    scss: './sass/*.scss'
};

/* Scripts task */
gulp.task('scripts', function() {
    return gulp.src([
        /* Add your JS files here, they will be combined in this order */
        // './js/',
    ])
        .pipe(concat('main.js'))
        .pipe(gulp.dest('public/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(uglify())
        .pipe(gulp.dest('public/js'));
});

gulp.task('sass', function () {
    gulp.src('sass/main.scss')
        .pipe(plumber())
        .pipe(sass({
            includePaths: ['scss'].concat(neat)
        }))
        .pipe(gulp.dest('public/css'))
        .pipe(rename({suffix: '.min'}))
        .pipe(minifycss())
        .pipe(gulp.dest('public/css'))
        /* Reload the browser CSS after every change */
        .pipe(reload({stream:true}));
});

gulp.task('bs-reload', function () {
    browserSync.reload();
});

gulp.task('browser-sync', function() {
    browserSync.init(['public/css/*.css', 'public/js/*.js'], {
        proxy: "localhost:8888"
    });
});

gulp.task('server',function(){
    nodemon({
        'script': 'index.js',
        //'ignore': 'public/js/*.js'
    });
});
gulp.task('default', ['server', 'sass', 'browser-sync'], function () {
    gulp.watch(['sass/*.scss', 'sass/**/*.scss'], ['sass']);
    gulp.watch(['js/app.js'], ['scripts']);
    gulp.watch(['views/**/*.ejs'], ['bs-reload']);
});