// // Karma configuration file, see link for more information
// // https://karma-runner.github.io/1.0/config/configuration-file.html

// module.exports = function(config) {
//     config.set({
//         basePath: '',
//         files: [
//             { pattern: "./src/test.ts", included: true }
//         ],
//         frameworks: ['jasmine'],
//         preprocessors: {
//             'src/test.ts': ['webpack']
//         },
//         webpack: require('./webpack.config.dev'),
//         webpackMiddleware: {
//             // webpack-dev-middleware configuration
//             // i. e.
//             stats: 'errors-only'
//         },
//         plugins: [
//             require('karma-jasmine'),
//             require('karma-chrome-launcher'),
//             require('karma-webpack'),
//             require('karma-jasmine-html-reporter'),
//             require('karma-coverage-istanbul-reporter'),
//             //  require('@angular/cli/plugins/karma')
//         ],
//         client: {
//             clearContext: false // leave Jasmine Spec Runner output visible in browser
//         },
//         coverageIstanbulReporter: {
//             reports: ['html', 'lcovonly'],
//             fixWebpackSourcePaths: true
//         },
//         // angularCli: {
//         //     environment: 'dev'
//         // },
//         reporters: ['progress', 'kjhtml'],
//         port: 9876,
//         colors: true,
//         logLevel: config.LOG_INFO,
//         autoWatch: true,
//         browsers: ['Chrome'],
//         singleRun: false
//     });
// };
// reuse existing webpack.config
// remove entry value since karma-webpack will set its value automatically
const webpackConfig = require("./webpack.config.dev.js");
webpackConfig.entry = undefined;

module.exports = (config) => {
    config.set({
        basePath: ".",
        frameworks: ["jasmine"],
        files: [
            "./src/test.main.ts"
        ],
        preprocessors: {
            "./src/test.main.ts": ["webpack"]
        },
        mime: {
            "text/x-typescript": ["ts"]
        },
        webpack: webpackConfig,
        webpackMiddleware: {
            stats: "error-only"
        },
        reporters: ["progress", 'kjhtml'],
        port: 9876,
        colors: true,
        logLevel: config.LOG_ERROR,
        singleRun: true,
        browsers: ["Chrome"],
        concurrency: Infinity
    });
};