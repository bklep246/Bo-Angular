'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();

function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    //if (baseDir === 'app' || (util.isArray(baseDir) && baseDir.indexOf(conf.paths.src) !== -1)) {
    //    routes = {
    //        '/bower_components': 'bower_components'
    //    };
    //}

    var server = {
        baseDir: baseDir,
        routes: routes
    };

    /*
     * You can add a proxy to your backend by uncommenting the line below.
     * You just have to configure a context which will we redirected and the target url.
     * Example: $http.get('/users') requests will be automatically proxified.
     *
     * For more details and option, https://github.com/chimurai/http-proxy-middleware/blob/v0.0.5/README.md
     */
    // server.middleware = proxyMiddleware('/users', {target: 'http://jsonplaceholder.typicode.com', proxyHost: 'jsonplaceholder.typicode.com'});

    browserSync.instance = browserSync.init({
        startPath: '/',
        server: server,
        browser: browser
    });
}

gulp.task('clean-styles', function () {
    var files = config.temp + '**/*.css';
    //return del(files);
    clean(files);
    //log('done cleaning');
});

gulp.task('lint', function () {
    log('analyzing source with eslint');
    return gulp.src(config.alljs)
        .pipe($.if(args.verbose, $.print()))
        // eslint() attaches the lint output to the "eslint" property 
        // of the file object so it can be used by other modules. 
        .pipe($.eslint())
        // eslint.format() outputs the lint results to the console. 
        // Alternatively use eslint.formatEach() (see Docs). 
        .pipe($.eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe($.eslint.failAfterError());
});

gulp.task('serve', ['lint', 'styles'], function () {
    browserSyncInit(['./']);

    gulp.watch([config.appSass], ['app-styles']);
    gulp.watch([config.extAccountWidgetsSass], ['account-styles']);
    gulp.watch([config.extTradingWidgetsSass], ['trading-styles']);
});

gulp.task('styles', ['clean-styles', 'app-styles', 'ext-styles'], function () { });

gulp.task('app-styles', function () {
    log('compiling app SASS --> CSS');

    return gulp.src(config.appMainSass)
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('ext-styles', ['account-styles', 'trading-styles'], function () {});

gulp.task('trading-styles', function () {
    return gulp.src(config.extTradingWidgetsMainSass)
        //Plumber keeps stream alive and shows error messages
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('account-styles', function () {
    return gulp.src(config.extAccountWidgetsMainSass)
        //Plumber keeps stream alive and shows error messages
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(config.temp))
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('wiredep', function () {
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp.src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

////////////////////////////////////////////

function clean(path) {
    log('Cleaning: ' + $.util.colors.blue(path));
    return del(path);
}

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) {
                $.util.log($.util.colors.blue(msg[item]));
            }
        }
    } else {
        $.util.log($.util.colors.blue(msg));
    }
}