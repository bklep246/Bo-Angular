module.exports = function () {
    var config = {
        temp: '.tmp/',
        alljs: ['app/**/*.js', 'ext-modules/**/*.js'],
        client: './',
        index: './index.html',
        js: [
            'app/**/*Module.js',
            'app/**/*.js'
        ],
        appMainSass: ['app/*.scss'],
        appSass: ['app/**/*.scss'],
        extAccountWidgetsMainSass: ['ext-modules/accountWidgets/*.scss'],
        extAccountWidgetsSass: ['ext-modules/accountWidgets/**/*.scss'],
        extTradingWidgetsMainSass: ['ext-modules/tradingWidgets/*.scss'],
        extTradingWidgetsSass: ['ext-modules/tradingWidgets/**/*.scss'],
        /**
         * Bower and NPM locations
         */
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