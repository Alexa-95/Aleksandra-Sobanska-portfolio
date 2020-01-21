var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    autoprefixer = require('gulp-autoprefixer'),
    uglify = require('gulp-uglify'),
    jshint = require('gulp-jshint'),
    rename = require('gulp-rename'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    package = require('./package.json'),
    fileinclude = require('gulp-file-include'),
    concat = require('gulp-concat'),
    modRewrite = require('connect-modrewrite');


//images
var imgSRC = 'src/images/**/*.*',
    imgDEST = 'dist/images/';

gulp.task('images', function () {
    console.log('ZANOTOWANO ZMIANĘ W IMAGES ... generowanie w toku');
    gulp.src(imgSRC)
    .pipe(gulp.dest(imgDEST))
    .pipe(browserSync.stream());
    console.log(' ---------------------------------------------------\n|     WYGENEROWANO POMYŚLNIE PRODUKCYJNE OBRAZKI    |\n ---------------------------------------------------');
});




// css
var cssSRC = 'src/scss/**/*.scss',
    cssDEST = 'dist/';

gulp.task('css', function () {
    return gulp.src('src/scss/s.scss')
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer('last 4 version'))
    .pipe(gulp.dest(cssDEST))
    .pipe(cssnano())
    .pipe(rename({ suffix: '.min' }))
    .pipe(sourcemaps.write("/"))
    .pipe(gulp.dest(cssDEST))
    .pipe(browserSync.reload({stream:true}));
});




//scripts
var jsSRCall = 'src/js/*.js',
    jsSRC = 'src/js/_*.js',
    jsDEST = 'dist/js/',
    jsDevDEST = 'src/',
    jsDESTname = 'service.js';

gulp.task('js', function() {
    return gulp.src(['src/js/main.js', jsSRC])
        .pipe(sourcemaps.init())
        .pipe(jshint('.jshintrc'))
        .pipe(concat(jsDESTname))
        .pipe(gulp.dest(jsDevDEST))
        .pipe(uglify())
        .on('error', function (err) { gutil.log(gutil.colors.red('[Error]'), err.toString()); })
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write("/map/"))
        .pipe(gulp.dest(jsDEST))
        .pipe(browserSync.reload({stream:true, once: true}));

});



//html
var htmlSRC = 'src/html/**/*.html',
    htmlDEST = 'dist/';

gulp.task('html', function () {
    return gulp.src(htmlSRC)
    .pipe(fileinclude({prefix: '@@', basepath: '@file'}))
    .pipe(gulp.dest(htmlDEST))
    .pipe(browserSync.reload({stream:true, once: true}));
});

gulp.task('browser-sync', function() {
    console.log(' --------------------------------------------------\n|                                                  |\n|      ....... GULP IS WATCHING YOU......          |\n|                                                  |\n --------------------------------------------------');
    browserSync.init({
        server: {
            baseDir: "dist/"
        }
    });
});
gulp.task('bs-reload', function () {
    browserSync.reload({stream:true, once: true});
});

gulp.task('dev', ['css', 'js', 'html', 'images'], function () {
    gulp.watch(cssSRC, ['css']);
    gulp.watch(jsSRCall, ['js']);
    gulp.watch(htmlSRC, ['html']);
    gulp.watch(imgSRC, ['images']);
    console.log(' --------------------------------------------------\n|                                                  |\n|      ....... GULP IS WATCHING YOU......          |\n|                                                  |\n --------------------------------------------------');
    browserSync.init({
        server: {
            proxy: package.url.dev,
            baseDir: 'dist/',
            middleware: [
                modRewrite([
                    '!\\.\\w+$ /index.html [L]'
                ])
            ]
        }
    });
    gulp.watch(htmlSRC).on('change', browserSync.reload);
    gulp.watch(cssSRC).on('change', browserSync.reload);
    gulp.watch(jsSRCall).on('change', browserSync.reload);
});
