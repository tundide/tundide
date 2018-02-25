const webpack = require('webpack');
let webpackMerge = require('webpack-merge');
let commonConfig = require('./webpack.config.common.js');
let LiveReloadPlugin = require('webpack-livereload-plugin');
let blocks = ['production'];

module.exports = webpackMerge(commonConfig, {
    devtool: 'source-map',
    module: {
        rules: [{
                enforce: 'pre',
                test: /\.ts$/,
                exclude: /(node_modules)/,
                use: [{
                        loader: 'tslint-loader',
                    },
                    {
                        loader: 'webpack-strip-blocks',
                        options: {
                            blocks: blocks,
                            start: '/*',
                            end: '*/'
                        }
                    }
                ]
            },
            {
                test: /\.html$/,
                enforce: 'pre',
                use: [{
                    loader: 'webpack-strip-blocks',
                    options: {
                        blocks: blocks,
                        start: '<!--',
                        end: '-->'
                    }
                }]
            }
        ]
    },
    output: {
        path: __dirname + "/public/js/app",
        publicPath: "/js/app/",
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    plugins: [
        new LiveReloadPlugin(),
        new webpack.LoaderOptionsPlugin({
            debug: true,
            options: {
                tslint: {
                    failOnHint: true,
                    configuration: require('./tslint.json')
                }
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'environment': JSON.stringify(process.env.NODE_ENV),
                'mercadopago': JSON.stringify('TEST-fdf46f46-0af3-41dc-9807-f31ed3738185'),
                'maps': JSON.stringify('AIzaSyAFht5eU4BjOis_oHitK7TF01Dh1VgTWJw')
            }
        })
    ]
});