var gulp = require('gulp');

var apidoc = require('gulp-apidoc'),
    plumber = require('gulp-plumber');

var uglify = require('gulp-uglify');


var sourceCSS = 'src/client/css/',
    destCSS = 'public/css/',
    destFolder = './public/js/',
    destFile = 'bundle.js',
    sass = require('gulp-sass'),
    browserify = require('browserify'),
    hbsfy = require("hbsfy"),
    source = require('vinyl-source-stream'),
    watchify = require('watchify'),
    gutil = require('gulp-util'),
    sourceFile = './src/client/js/main.js';


//初始化browserify


gulp.task('copy', function () {
    gulp.src('src/client/index.html').pipe(gulp.dest('public'));
    gulp.src('src/client/bower_components/**/*').pipe(gulp.dest('public/bower_components'));
    gulp.src('src/client/img/**/*').pipe(gulp.dest('public/img'));
    gulp.src('node_modules/bootstrap-sass/assets/fonts/**/*').pipe(gulp.dest('public/fonts'));


})

gulp.task('build-css', function () {
    return gulp.src(sourceCSS + '*.scss')
        .pipe(plumber())
        .pipe(sass())
        .pipe(gulp.dest(destCSS));

})


gulp.task('browserify-build', function () {
    var bundler = browserify({
        // Required watchify args
        cache: {},
        packageCache: {},
        plugin: [watchify],
        fullPaths: true,
        // Browserify Options
        entries: sourceFile,
        debug: true
    });

    hbsfy.configure({
        extensions: ['hbs']
    });


    var bundle = function () {
        return bundler
            .transform(hbsfy)
            .bundle()
            .on('error', function (err) {
                console.log(err.message);
                this.emit('end');
            })
            .pipe(source(destFile))
            .pipe(gulp.dest(destFolder));

    };

    bundler.on('update', bundle);
    bundler.on('log', gutil.log);


    return bundle();

})


gulp.task('build-dist', ['copy', 'build-css'], function () {


});


gulp.task('build-apidoc', function (done) {

    apidoc({
        src: "src/",
        dest: "doc/API"
    }, done);

});


//压缩js
gulp.task('minifyJs', function () {
    return gulp.src('public/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest(destFolder));
});


gulp.task('default', function () {
    gulp.watch('src/client/**/*', ['build-dist']);
    gulp.start("browserify-build")

});


