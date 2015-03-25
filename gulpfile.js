'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var server = require('./server');
var reload = browserSync.reload;

var AUTOPREFIXER_BROWSERS = [
    'ie >= 9',
    'ie_mob >= 10',
    'ff >= 30',
    'chrome >= 34',
    'safari >= 7',
    'opera >= 23',
    'ios >= 7',
    'android >= 4.0',
    'bb >= 10'
];

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
    return gulp.src([
        'app/*',
        //'!app/*.html',
        '!app/*.jade',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    })
        .pipe($.changed('dist'))
        .pipe(gulp.dest('dist'))
});

// Copy Web Fonts To Dist
gulp.task('fonts', function () {
    return gulp.src(['app/fonts/**'])
        .pipe(gulp.dest('dist/fonts'))
});


// Compile and Automatically Prefix Stylesheets
gulp.task('styles', function () {
    // For best performance, don't add Sass partials to `gulp.src`
    return gulp.src([
        'app/styles/*.scss',
        'app/styles/**/*.css'
    ])
        .pipe($.changed('styles'))
        .pipe($.sass({
            errLogToConsole: true,
            style: 'expanded',
            precision: 10,
            includePaths: require('node-neat').includePaths
        }).on('error', console.error.bind(console))
    )
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        .pipe(gulp.dest('dist/styles'))
        .pipe(reload({stream: true}));
});

gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    return gulp.src('./app/*.jade')
        .pipe($.jade({
            locals: YOUR_LOCALS,
            pretty: true
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function () {
    return gulp.src("./app/scripts/*.js")
        .pipe($.uglify()
            .on('error', function (error) {
                console.warn(error.message);
            })
    )
        .pipe($.concat('main.min.js'))
        .pipe(gulp.dest("dist/scripts"))
});

gulp.task('vendor', function () {
    return gulp.src([
        "./bower_components/jquery/dist/jquery.min.js",
        './bower_components/modernizr/modernizr.js'
    ])
        .pipe($.concat('vendor.js'))
        .pipe($.uglify())
        .pipe(gulp.dest("dist/scripts"))
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Build and serve the output from the dist build
gulp.task('serve', function () {
    browserSync({
        notify: true,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
});

// Watch Files For Changes & Reload
gulp.task('watch', function () {
    gulp.watch(['app/**/*.jade'], ["templates"]);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles']);
    gulp.watch(['app/scripts/**/*.js'], ['js']);
    gulp.watch(['app/*.*', "!app/*.jade"], ['copy']);
    gulp.watch(['app/images/**/*'], ["images"]);
    gulp.watch(['app/fonts/**/*'], ["fonts"]);

    gulp.watch(['dist/**/*.*', "!dist/styles/**/*.css"], reload);
});

// Build Production Files, the Default Task
gulp.task('default', ['build'], function (cb) {
    gulp.start('serve');
    gulp.start('watch');
});

// Build Production Files, the Default Task
gulp.task('build', ['clean'], function (cb) {
    runSequence('styles', ['js', 'vendor', 'templates', 'images', 'fonts'], 'copy', cb);
});

// Optimize Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        //.pipe($.cache($.imagemin({
        //    progressive: true,
        //    interlaced: true
        //})))
        .pipe(gulp.dest('./dist/images'));
});

// --- Heroku Task. Is only run when deployed to heroku.
gulp.task('heroku', function () {
    gulp.start('build');
    var port = process.env.PORT || 3000;
    server.listen(port, function () {
        console.log("Listening on " + port);
    });
});

// Load custom tasks from the `tasks` directory
try {
    require('require-dir')('tasks');
} catch (err) {
}