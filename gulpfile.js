'use strict';

var gulp = require('gulp');
var args = require('yargs').argv;
var del = require('del');
var browserSync = require('browser-sync').create();
var reload = browserSync.reload;

var $ = require('gulp-load-plugins')({ lazy: true });
var config = require('./gulp.config')();

function browserSyncInit(baseDir, browser) {
    if (browserSync.active) {
        return;
    }

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

/////////////////// TEMPLATE CACHE /////////////////////////
gulp.task('appTemplateCache', function () {
    log('Creating AngularJS $templatecache');
    var appConfig = config.templateCache;
    loadTemplateCache(config.htmltemplates, appConfig.file, appConfig.options, config.temp);
});

gulp.task('accountTemplateCache', function () {
    log('Creating AngularJS $templatecache for ext-modules account widgets');
    var accountConfig = config.accountWidgetstemplateCache;
    loadTemplateCache(config.accountWidgetsHtmlTemplates, accountConfig.file, accountConfig.options, config.temp);
});

gulp.task('marketTemplateCache', function () {
    log('Creating AngularJS $templatecache for ext-modules market widgets');
    var marketConfig = config.marketWidgetstemplateCache;
    loadTemplateCache(config.marketWidgetsHtmlTemplates, marketConfig.file, marketConfig.options, config.temp);
});

gulp.task('tradingTemplateCache', function () {
    log('Creating AngularJS $templatecache for ext-modules trading widgets');
    var tradingConfig = config.tradingWidgetstemplateCache;
    loadTemplateCache(config.tradingWidgetsHtmlTemplates, tradingConfig.file, tradingConfig.options, config.temp);
});

gulp.task('templatecache', ['appTemplateCache', 'accountTemplateCache', 'marketTemplateCache', 'tradingTemplateCache']);
///////////////////// END TEMPLATE CACHE  /////////////////////////////////

/////////////////////// STYLES - CSS/SASS ///////////////////////////////////////////
gulp.task('styles', ['clean-styles', 'app-styles', 'ext-styles']);
gulp.task('app-styles', function () {
    sass(config.appMainSass, config.temp);
});

gulp.task('ext-styles', ['account-styles', 'market-styles', 'trading-styles']);
gulp.task('trading-styles', function () {
    sass(config.tradingWidgetsMainSass, config.temp);
});

gulp.task('account-styles', function () {
    sass(config.accountWidgetsMainSass, config.temp);
});

gulp.task('market-styles', function () {
    sass(config.marketWidgetsMainSass, config.temp);
});
//////////////////// END STYLES //////////////////////////////////////////

//////////////////// CLEAN TASKS /////////////////////////////////////////
gulp.task('clean-fonts', function () {
    clean(config.build + 'fonts/**/*.*');
});

gulp.task('clean-styles', function () {
    clean(config.temp + '**/*.css');
});

gulp.task('clean-images', function () {
    clean(config.build + 'images/**/*.*');
});

gulp.task('clean-code', function () {
    var files = [].concat(
        config.temp + '**/*.js',
        config.build + '**/*.html',
        config.build + 'js/**/*.js'
    );
    clean(files);
});

gulp.task('clean', ['clean-styles', 'clean-fonts', 'clean-images', 'clean-code']);
//////////////////////// END CLEAN TASKS /////////////////////////////////

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
    //.pipe($.eslint.failAfterError())
    .pipe($.size());
});

gulp.task('fonts', function () {
    log('Copying fonts to build folder');
    return gulp.src(config.fonts)
    .pipe(gulp.dest(config.build + 'fonts'));
});

gulp.task('images', function () {
    log('Copying and compressing images to build folder');
    return gulp.src(config.images)
        .pipe($.imagemin({ optimizationLevel: 4 }))
    .pipe(gulp.dest(config.build + 'images'));
});

gulp.task('wiredep', function () {
    log('Wire up the bower css js and our app js into the html');
    var options = config.getWiredepDefaultOptions();
    var wiredep = require('wiredep').stream;

    return gulp.src(config.index)
    .pipe(wiredep(options))
    .pipe($.inject(gulp.src(config.js)))
    .pipe(gulp.dest(config.client));
});

gulp.task('inject', ['wiredep', 'styles', 'templatecache'], function () {
    log('Wire up the app css into the html, and call wiredep');

    //return gulp.src(config.index)
    //.pipe($.inject(gulp.src([
    //    config.appCss,
    //    config.accountWidgetsCss,
    //    config.marketWidgetsCss,
    //    config.tradingWidgetsCss
    //])))
    //.pipe(gulp.dest(config.client));
});

gulp.task('test', function (done) {
    startTests(true /*singleRun*/, done)
});

gulp.task('serve', ['lint', 'inject'], function () {
    browserSyncInit(['./']);

    //watch sass changes
    gulp.watch([config.appSass], ['app-styles']);
    gulp.watch([config.accountWidgetsSass], ['account-styles']);
    gulp.watch([config.tradingWidgetsSass], ['trading-styles']);
    gulp.watch([config.marketWidgetsSass], ['market-styles']);

    //watch html changes
    gulp.watch(config.allhtml, reload);

    //watch js changes
    gulp.watch(config.alljs, function () {
        lintReload(config.alljs);
    });
});

gulp.task('serve:dist', ['build'], function () {
    browserSyncInit(['dist']);
});

gulp.task('build', ['inject', 'images', 'fonts'], function () {
    log('Optimizing the javascript, css, html for dist folder');
    //var assets = $.useref.assets({ searchPath: './' });
    var templateCache = [
        config.temp + config.templateCache.file,
        config.temp + config.accountWidgetstemplateCache.file,
        config.temp + config.marketWidgetstemplateCache.file,
        config.temp + config.tradingWidgetstemplateCache.file,
    ];

    return gulp.src(config.index)
    .pipe($.plumber())
    .pipe($.inject(gulp.src(templateCache, { read: false }), {
        starttag: '<!-- inject:templates:js -->'
    }))
        .pipe($.useref({ searchPath: './' }))
        .pipe($.if('*.js', $.uglify()))
    .pipe($.if('*.css', $.cssnano()))
    .pipe($.if('*.html', $.htmlmin()))
    .pipe(gulp.dest(config.build))
    .pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('help', $.taskListing);

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

/////////////////// HELPER FUNCTIONS /////////////////////////

function lintReload(path) {
    log('analyzing source with eslint');
    return gulp.src(path)
        .pipe($.eslint())
        .pipe($.eslint.format())
        //.pipe($.eslint.failAfterError())
        .pipe(browserSync.reload({ stream: true }));
}

function loadTemplateCache(src, file, options, dest) {
    return gulp.src(src)
        .pipe($.htmlmin({ collapseWhitespace: true }))
        .pipe($.angularTemplatecache(
            file,
            options))
        .pipe(gulp.dest(dest));
}

function sass(path, destPath) {
    log('Compiling sass from: ' + $.util.colors.blue(path) + ' to ' + $.util.colors.blue(destPath));
    return gulp.src(path)
        //Plumber keeps stream alive and shows error messages
        .pipe($.plumber())
        .pipe($.sass())
        .pipe($.autoprefixer({ browsers: ['last 2 version', '> 5%'] }))
        .pipe(gulp.dest(destPath))
        .pipe(browserSync.reload({ stream: true }));
}

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

function startTests(singleRun, done) {
    var Server = require('karma').Server;
    //var excludeFiles = [];
    //var serverSpecs = config.serverIntegrationSpecs;
    //excludeFiles = serverSpecs;
    
    new Server({
        configFile: __dirname + '/karma.conf.js',
        //exclude: excludeFiles,
        singleRun: !!singleRun
    }, karmaCompleted).start();

    //karma.start({
    //    config: __dirname + '/karma.conf.js',
    //    exclude: excludeFiles,
    //    single: !!singleRun
    //}, karmaCompleted);

    function karmaCompleted(karmaResult) {
        log('Karma Completed');
        if (karmaResult === 1) {
            done('karma: tests failed with code ' + karmaResult);
        }
        else {
            done();
        }
    }
}
//////////////////// END HELPER FUNCTIONS //////////////////////////