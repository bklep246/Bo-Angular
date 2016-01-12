'use strict';

var gulp = require('gulp');
var strip = require('gulp-strip-line');
var browserSync = require('browser-sync').create();
var $ = require('gulp-load-plugins')();
var reload = browserSync.reload;


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

gulp.task('menuPartials', function () {
    return gulp.src(['./ext-modules/psMenu/**/*.html'])
        .pipe($.angularTemplatecache('templateCacheHtmlMenu.js', {
            module: 'psMenu',
            root: 'ext-modules/psMenu/'
        }))
        .pipe(gulp.dest('.tmp/partials/'));
});

gulp.task('dashboardPartials', function () {
    return gulp.src(['./ext-modules/psDashboard/**/*.html'])
        .pipe($.angularTemplatecache('templateCacheHtmlDashboard.js', {
            module: 'psDashboard',
            root: 'ext-modules/psDashboard/'
        }))
        .pipe(gulp.dest('.tmp/partials/'));
});

gulp.task('frameworkPartials', function () {
    return gulp.src(['./ext-modules/psFramework/**/*.html'])
        .pipe($.angularTemplatecache('templateCacheHtmlFramework.js', {
            module: 'psFramework',
            root: 'ext-modules/psFramework/'
        }))
        .pipe(gulp.dest('.tmp/partials/'));
});

gulp.task('partials', ['menuPartials', 'dashboardPartials', 'frameworkPartials'], function () {
    return gulp.src([
      'app/**/*.html',
      '.tmp/serve/app/**/*.html'
    ])
      .pipe($.htmlmin({ collapseWhitespace: true }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
          module: 'app',
          root: 'app'
      }))
      .pipe(gulp.dest('.tmp/partials/'));
});

gulp.task('html', ['inject', 'partials'], function () {
    var partialsInjectFile = gulp.src('.tmp/partials/*.js', { read: false });
    var partialsInjectOptions = {
        starttag: '<!-- inject:partials -->',
        ignorePath: '.tmp/partials',
        addRootSlash: false
    };

    //var htmlFilter = $.filter('*.html', { restore: true });
    //var jsFilter = $.filter('**/*.js', { restore: true });
    //var cssFilter = $.filter('**/*.css', { restore: true });
    //var assets;

    return gulp.src('.tmp/serve/*.html')
        .pipe($.inject(partialsInjectFile, partialsInjectOptions))
        .pipe($.useref())
        .pipe($.if('*.js', $.uglify()))
        //.pipe($.if('*.css', $.cssnano()))
        //.pipe($.if('*.html', $.htmlmin()))
        //.pipe($.rev())
        //.pipe(jsFilter)
        //.pipe($.sourcemaps.init())
        //.pipe($.ngAnnotate())
        //.pipe($.uglify({ preserveComments: $.uglifySaveLicense }))
        //.pipe($.sourcemaps.write('maps'))
        //.pipe(jsFilter.restore)
        //.pipe(cssFilter)
        //.pipe($.sourcemaps.init())
        //.pipe($.replace('../../bower_components/bootstrap-sass/assets/fonts/bootstrap/', '../fonts/'))
        //.pipe($.cssnano())
        //.pipe($.sourcemaps.write('maps'))
        //.pipe(cssFilter.restore)
        //.pipe(assets.restore())
        //.pipe($.useref())
        //.pipe($.revReplace())
        //.pipe(htmlFilter)
        //.pipe($.htmlmin())
        //.pipe(htmlFilter.restore)
        .pipe(gulp.dest('dist/'))
        .pipe($.size({ title: 'dist/', showFiles: true }));
});

//return gulp.src([
//    './app/**/*.html',
//    './ext-modules/psMenu/**/*.html',
//    './ext-modules/psDashboard/**/*.html',
//    './ext-modules/psFramework/**/*.html'
//])
//    .pipe($.angularTemplatecache('templateCacheHtml.js', {
//        module: 'app',
//        root: 'app'
//    }))
//    .pipe(gulp.dest('./app/'));
//});

gulp.task('images', function() {
    return gulp.src('./Images/**/*')
      .pipe($.if($.if.isFile, $.cache($.imagemin({
          progressive: true,
          interlaced: true,
          // don't remove IDs from SVGs, they are often used
          // as hooks for embedding and styling
          svgoPlugins: [{ cleanupIDs: false }]
      }))
      .on('error', function (err) {
          console.log(err);
          this.end();
      })))
      .pipe(gulp.dest('dist/images'));
});

gulp.task('styles', function () {
    var sassOptions = {
        style: 'expanded'
    };

    var injectFiles = gulp.src([
      'app/*.scss',
      'ext-modules/*.scss'
    ], { read: false });

    var injectOptions = {
        //transform: function (filePath) {
        //    filePath = filePath.replace(conf.paths.src + '/app/', '');
        //    return '@import "' + filePath + '";';
        //},
        //starttag: '// injector',
        //endtag: '// endinjector',
        addRootSlash: false
    };

    return gulp.src([
      'app/app.scss',
      'ext-modules/ext-modules.scss'
    ])
      .pipe($.inject(injectFiles, injectOptions))
      //.pipe(wiredep(_.extend({}, conf.wiredep)))
      .pipe($.sourcemaps.init())
      .pipe($.sass(sassOptions))
      //.pipe($.autoprefixer()).on('error', conf.errorHandler('Autoprefixer'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest('.tmp/serve/app/'))
      .pipe(browserSync.reload({ stream: true }));
});

gulp.task('jsHint', function () {
    return gulp.src('app/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(reload({ stream: true }))
      .pipe($.size());
});

gulp.task('jsHint-Ext', function () {
    return gulp.src('ext-modules/**/*.js')
      .pipe($.jshint())
      .pipe($.jshint.reporter('jshint-stylish'))
      .pipe(reload({ stream: true }))
      .pipe($.size());
});

gulp.task('inject', ['styles', 'jsHint', 'jsHint-Ext'], function () {
    var injectStyles = gulp.src([
        '.tmp/serve/app/**/*.css',
        '!.tmp/serve/app/vendor.css'
    ], { read: false });

    var injectScripts = gulp.src([
      'app/**/*.module.js',
      'ext-modules/**/*.module.js',
      'app/**/*.js',
      'ext-modules/**/*.js',
      '!app/**/*.spec.js',
      '!app/**/*.mock.js',
      '!ext-modules/**/*.spec.js',
      '!ext-modules/**/*.mock.js',
    ])
    .pipe($.angularFilesort());

    var injectOptions = {
        ignorePath: ['.tmp/serve'],
        addRootSlash: false
    };

    return gulp.src('*index.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      //.pipe(wiredep(_.extend({}, conf.wiredep)))
      .pipe(gulp.dest('.tmp/serve'));
});

gulp.task('dashboard-watch', ['buildDashboardTemplateCache', 'ext-scripts'], reload);
gulp.task('framework-watch', ['buildFrameworkTemplateCache', 'ext-scripts'], reload);
gulp.task('menu-watch', ['buildMenuTemplateCache', 'ext-scripts'], reload);
gulp.task('app-watch', ['buildTemplateCache', 'scripts'], reload);
gulp.task('build', ['html'], function () { });

gulp.task('clean', function () {
    return $.del(['.tmp/', 'dist/']);
});

gulp.task('serve', ['inject'], function () {
    //browserSync.init({
    //    server: {
    //        notify: false,
    //        port: 9000,
    //        baseDir: ['.tmp', './']
    //    }
    //});

    gulp.watch([
    '*.html',
    'Images/**/*'
    ]).on('change', reload);

    //watch app css file changes
    gulp.watch('app/**/*.scss', ['styles']);

    //watch css file changes for ext-modules
    gulp.watch('ext-modules/**/*.scss', ['ext-styles']);

    //watch app js file changes
    gulp.watch('app/**/*.js', ['scripts', 'jsHint']);

    //watch ext-modules js file changes
    gulp.watch('ext-modules/**/*.js', ['ext-scripts', 'jsHint-Ext']);

    //watch app html changes
    gulp.watch('app/**/*.html', ['app-watch']);

    //watch dashboard html changes
    gulp.watch('ext-modules/psDashboard/**/*.html', ['dashboard-watch']);

    //watch framework html changes
    gulp.watch('ext-modules/psFramework/**/*.html', ['framework-watch']);

    //watch menu html changes
    gulp.watch('ext-modules/psMenu/**/*.html', ['menu-watch']);

    browserSyncInit(['.tmp/serve', './']);
});

gulp.task('serve:dist', ['build'], function () {
    browserSync.init({
        server: {
            notify: false,
            port: 9000,
            server: {
                baseDir: ['dist']
            }
        }
    });
});

gulp.task('default', ['clean'], function () {
    gulp.start('build');
});

//function startTests(singleRun, done) {
//    var karma = require('karma').server;
//    var excludeFiles = [];
//    var serverSpecs = config.serverIntegrationSpecs;
//    excludeFiles = serverSpecs;

//    karma.start({
//        config: __dirname + '/karma.conf.js',
//        exlude: excludeFiles,
//            single: !!singleRun
//    }, karmaCompleted);

//    function karmaCompleted(karmaResult) {
//        log('Karma C')
//}
//}

//gulp.task('test', function(done){
//    startTests(true /* singleRun */, done);
//});