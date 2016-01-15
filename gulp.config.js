module.exports = function () {
    var temp = '.tmp/';
    var app = 'app/';
    var extModules = 'ext-modules/';

    var config = {
        temp: temp,
        alljs: [app + '**/*.js', 'ext-modules/**/*.js'],
        build: './dist/',
        fonts: './bower_components/font-awesome/fonts/**/*.*',
        htmltemplates: app + '**/*.html',
        accountWidgetsHtmlTemplates: extModules + 'accountWidgets/**/*.html',
        marketWidgetsHtmlTemplates: extModules + 'marketWidgets/**/*.html',
        tradingWidgetsHtmlTemplates: extModules + 'tradingWidgets/**/*.html',
        images: './images/**/*.*',
        client: './',
        index: './index.html',
        appCss: temp + 'app.css',
        extAccountWidgetsCss: temp + 'accountWidgets.css',
        extTradingWidgetsCss: temp + 'tradingWidgets.css',
        js: [
            app + '**/*Module.js',
            extModules + '**/*Module.js',
            app + '**/*.js',
            extModules + '**/*.js'
        ],
        appMainSass: [app + '*.scss'],
        appSass: [app + '**/*.scss'],
        extAccountWidgetsMainSass: [extModules + 'accountWidgets/*.scss'],
        extAccountWidgetsSass: [extModules + 'accountWidgets/**/*.scss'],
        extTradingWidgetsMainSass: [extModules + 'tradingWidgets/*.scss'],
        extTradingWidgetsSass: [extModules + 'tradingWidgets/**/*.scss'],

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

    return config;
};