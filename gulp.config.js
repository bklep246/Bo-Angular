module.exports = function () {
    var temp = '.tmp/';
    var app = 'app/';
    var report = './report/';
    var extModules = 'ext-modules/';
    var services = 'services';
    var wiredep = require('wiredep');
    var bowerFiles = wiredep({ devDependencies: true })['js'];
    var client = './';

    var config = {
        temp: temp,
        report: report,
        services: services,
        alljs: [app + '**/*.js', 'ext-modules/**/*.js', 'services/**/*.js'],
        build: './dist/',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        htmltemplates: app + '**/*.html',
        accountWidgetsHtmlTemplates: extModules + 'accountWidgets/**/*.html',
        marketWidgetsHtmlTemplates: extModules + 'marketWidgets/**/*.html',
        tradingWidgetsHtmlTemplates: extModules + 'tradingWidgets/**/*.html',
        images: './images/**/*.*',
        client: client,
        index: './index.html',
        appCss: temp + 'app.css',
        accountWidgetsCss: temp + 'accountWidgets.css',
        tradingWidgetsCss: temp + 'tradingWidgets.css',
        marketWidgetsCss: temp + 'marketWidgets.css',
        js: [
            app + '**/*.module.js',
            extModules + '**/*.module.js',
            services + '**/*.module.js',
            app + '**/*.js',
            extModules + '**/*.js',
            services + '**/*.js',
            '!app/**/*.spec.js'
        ],
        allhtml: [
            app + '**/*.html',
            extModules + 'accountWidgets/**/*.html',
            extModules + 'marketWidgets/**/*.html',
            extModules + 'tradingWidgets/**/*.html'
        ],
        appMainSass: [app + '*.scss'],
        appSass: [app + '**/*.scss'],
        accountWidgetsMainSass: [extModules + 'accountWidgets/*.scss'],
        accountWidgetsSass: [extModules + 'accountWidgets/**/*.scss'],
        tradingWidgetsMainSass: [extModules + 'tradingWidgets/*.scss'],
        tradingWidgetsSass: [extModules + 'tradingWidgets/**/*.scss'],
        marketWidgetsMainSass: [extModules + 'marketWidgets/*.scss'],
        marketWidgetsSass: [extModules + 'marketWidgets/**/*.scss'],

        /** app template cache */
        templateCache: {
            file: 'templates.js',
            options: {
                module: 'app',
                root: app
            }
        },
        /** ext-module Account widgets template cache */
        accountWidgetstemplateCache: {
            file: 'accountWidgetsTemplates.js',
            options: {
                module: 'accountWidgets',
                root: 'ext-modules/accountWidgets/'
            }
        },
        /** ext-module Market widgets template cache */
        marketWidgetstemplateCache: {
            file: 'marketWidgetsTemplates.js',
            options: {
                module: 'marketWidgets',
                root: 'ext-modules/marketWidgets/'
            }
        },
        /** ext-module Trading widgets template cache */
        tradingWidgetstemplateCache: {
            file: 'tradingWidgetsTemplates.js',
            options: {
                module: 'tradingWidgets',
                root: 'ext-modules/tradingWidgets/'
            }
        },
        /** Bower and NPM locations */
        bower: {
            json: require('./bower.json'),
            directory: './bower_components/',
            ignorePath: '../..'
        },

        /*Karma tests and settings*/
        //specHelpers: [client + 'test-helpers/*.js'],
        //serverIntegrationSpecs: [client + 'tests/server-integration/**/*.spec.js'],
        karma: {

        }
    };

    config.getWiredepDefaultOptions = function () {
        var options = {
            bowerJson: config.bower.json,
            directory: config.bower.directory,
            ignorePath: config.bower.ignorePath
        };
        return options;
    };

    config.karma = getKarmaOptions();

    return config;

    function getKarmaOptions() {
        var options = {
            files: [].concat(
                bowerFiles,
                //config.specHelpers,
                app + '**/*.module.js',
                extModules + '**/*.module.js',
                app + '**/*.js',
                extModules + '**/*.js',
                temp + config.templateCache.file,
                temp + config.accountWidgetstemplateCache.file,
                //temp + config.marketWidgetstemplateCache.file,
                temp + config.tradingWidgetstemplateCache.file,
                client + 'tests/**/*.spec.js'
                //config.serverIntegrationSpecs
                ),
            exclude: [],
            coverage: {
                dir: report + 'coverage',
                reporters: [
                    { type: 'html', subdir: 'report-html' },
                    { type: 'lcov', subdir: 'report-lcov' },
                    { type: 'text-summary'}
                ]
            },
            preprocessors: {}
        };
        options.preprocessors[app + '**/!(*.spec)+(.js)'] = ['coverage'];
        return options;
    }
};