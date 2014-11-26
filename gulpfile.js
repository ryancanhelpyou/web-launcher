'use strict';

// Include Gulp & Tools We'll Use
var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var del = require('del');
var runSequence = require('run-sequence');
var browserSync = require('browser-sync');
var pagespeed = require('psi');
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

// Optimize Images
gulp.task('images', function () {
    return gulp.src('app/images/**/*')
        .pipe($.cache($.imagemin({
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'));
});

// Copy All Files At The Root Level (app)
gulp.task('copy', function () {
    return gulp.src([
        'app/*',
        //'!app/*.html',
        '!app/*.jade',
        'node_modules/apache-server-configs/dist/.htaccess'
    ], {
        dot: true
    }).pipe(gulp.dest('dist'))
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
        'app/styles/**/*.css',
        'app/styles/components/components.scss'
    ])
        .pipe($.changed('styles', {extension: '.scss'}))
        .pipe($.sass({
            includePaths: require('node-neat').includePaths,
            errLogToConsole: true,
            style: 'expanded',
            precision: 10
        }).on('error', console.error.bind(console))
    )
        .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
        //.pipe($.csso())
        .pipe(gulp.dest('dist/styles'))
});

gulp.task('templates', function () {
    var YOUR_LOCALS = {};

    return gulp.src('./app/*.jade')
        .pipe($.jade({
            locals: YOUR_LOCALS
        }))
        .pipe(gulp.dest('./dist/'))
});

gulp.task('js', function () {
    return gulp.src("./app/scripts/*.js")
        .pipe($.uglify()
            .on('error', function (error) {
                console.warn(error.message);
            })
    ).pipe($.concat('main.min.js'))
        .pipe(gulp.dest("./dist/scripts"))
});

gulp.task('vendor', function () {
    return gulp.src([
        'bower_components/jquery/dist/jquery.min.js',
        'bower_components/modernizr/modernizr.js'
    ])
        .pipe($.concat('vendor.js'))
        .pipe($.uglify())
        .pipe(gulp.dest("./dist/scripts"));
});

// Clean Output Directory
gulp.task('clean', del.bind(null, ['dist']));

// Build and serve the output from the dist build
// Watch Files For Changes & Reload
gulp.task('serve', ['default'], function () {
    browserSync({
        notify: false,
        // Run as an https by uncommenting 'https: true'
        // Note: this uses an unsigned certificate which on first access
        //       will present a certificate warning in the browser.
        // https: true,
        server: 'dist'
    });
    gulp.watch(['app/**/*.jade'], ["templates", reload]);
    gulp.watch(['app/styles/**/*.{scss,css}'], ['styles', reload]);
    gulp.watch(['app/scripts/**/*.js'], ['js', reload]);
    gulp.watch(['app/images/**/*'], reload);
    gulp.watch(['app/*.html'], ['copy', reload]);
});

// Build Production Files, the Default Task
gulp.task('default', ['clean'], function (cb) {
    runSequence('styles', ['js', 'vendor', 'templates', 'images', 'fonts', 'copy'], cb);
});

// Run PageSpeed Insights
// Update `url` below to the public URL for your site
gulp.task('pagespeed', pagespeed.bind(null, {
    // By default, we use the PageSpeed Insights
    // free (no API key) tier. You can use a Google
    // Developer API key if you have one. See
    // http://goo.gl/RkN0vE for info key: 'YOUR_API_KEY'
    url: 'https://example.com',
    strategy: 'mobile'
}));

// Load custom tasks from the `tasks` directory
try {
    require('require-dir')('tasks');
} catch (err) {
}
