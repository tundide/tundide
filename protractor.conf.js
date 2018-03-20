exports.config = {
    seleniumServerJar: './node_modules/selenium-standalone-jar/bin/selenium-server-standalone-3.0.1.jar',
    multiCapabilities: [
        // {
        //     browserName: 'internet explorer',
        // },
        {
            browserName: 'chrome'
        },
        // {
        //     browserName: 'firefox'
        // }
    ],
    specs: ['./test/e2e/auth/**/*.spec.js'],
    exclude: ['**/node_modules/**/*.*'],
    jasmineNodeOpts: {
        showColors: true
    }
};