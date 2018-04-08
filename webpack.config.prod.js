const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.config.common.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const CompressionPlugin = require("compression-webpack-plugin");
const blocks = ['development'];

module.exports = webpackMerge(commonConfig, {
    output: {
        path: __dirname + "/public/js/app",
        publicPath: "/js/app/",
        filename: '[name].bundle.js',
        chunkFilename: '[id].chunk.js'
    },
    optimization: {
        minimize: true
            // splitChunks: {
            //     chunks: 'all',
            // }
    },
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
    plugins: [
        new webpack.LoaderOptionsPlugin({
            options: {
                minimize: true,
                runtimeChunk: true,
                splitChunks: {
                    chunks: "async",
                    minSize: 1000,
                    minChunks: 2,
                    maxAsyncRequests: 5,
                    maxInitialRequests: 3,
                    name: true,
                    cacheGroups: {
                        default: {
                            minChunks: 1,
                            priority: -20,
                            reuseExistingChunk: true,
                        },
                        commons: {
                            test: /[\\/]node_modules[\\/]/,
                            name: "vendors",
                            chunks: "all"
                        }
                    }
                },
            }
        }),

        // uglifyOptions: {
        //     compress: {
        //         warnings: false,
        //         conditionals: true,
        //         unused: true,
        //         comparisons: true,
        //         sequences: true,
        //         dead_code: true,
        //         evaluate: true,
        //         if_return: true,
        //         join_vars: true
        //     },
        //     output: {
        //         comments: false
        //     },
        //     ie8: false
        // }
        new UglifyJsPlugin({
            uglifyOptions: {
                mangle: true,
                compress: {
                    warnings: false,
                    conditionals: true,
                    unused: true,
                    comparisons: true,
                    sequences: true,
                    dead_code: true,
                    evaluate: true,
                    if_return: true,
                    join_vars: true
                },
                output: {
                    comments: false
                },
                ie8: false,
                exclude: [/\.min\.js$/gi]
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'environment': JSON.stringify(process.env.NODE_ENV),
                'publickey': {
                    'maps': JSON.stringify('AIzaSyCfeshSfAtyd5vGr-S7U7tUIaMez-Z-8F0'),
                    'mercadopago': JSON.stringify('APP_USR-80dd6f34-5880-4ae7-904d-a9d748d77108')
                }
            }
        }),
        new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.js$|\.css$|\.html$/,
            threshold: 200,
            minRatio: 0.8
        })
    ]
});