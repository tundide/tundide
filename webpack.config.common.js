const webpack = require('webpack');
const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = {
    entry: {
        'polyfills': './src/polyfills.ts',
        'vendor': './src/vendor.ts',
        'app': './src/app.ts'
    },
    resolve: {
        extensions: ['.js', '.ts']
    },
    module: {
        rules: [{
                test: /\.ts$/,
                loaders: [
                    // 'angular-router-loader',
                    'angular2-template-loader',
                    {
                        loader: 'ts-loader',
                        options: {
                            // disable type checker - we will use it in fork plugin
                            transpileOnly: true,
                            happyPackMode: true
                        }
                    },
                    {
                        loader: 'thread-loader',
                        options: {
                            // there should be 1 cpu for the fork-ts-checker-webpack-plugin
                            // workers: require('os').cpus().length - 1,
                            workers: require('os').cpus().length - 1 // fastest build time for devServer: 3 threads; for production: 7 threads (os cpus minus 1)
                        }
                    }
                ]
            },
            {
                test: /\.(ts|js)$/,
                loaders: [
                    'angular-router-loader'
                ]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.scss$/,
                loaders: ['raw-loader', 'sass-loader']
            },
            {
                test: /\.css$/,
                loaders: ['raw-loader', 'css-loader']
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
                    {
                        loader: 'image-webpack-loader',
                        query: {
                            mozjpeg: {
                                progressive: true,
                            },
                            gifsicle: {
                                interlaced: false,
                            },
                            optipng: {
                                optimizationLevel: 4,
                            },
                            pngquant: {
                                quality: '75-90',
                                speed: 3,
                            },
                        },
                    }
                ]
            },
            { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "url-loader?limit=10000&minetype=application/font-woff" },
            { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: "file-loader" }
        ]
    },
    plugins: [
        new webpack.ProvidePlugin({
            $: "jquery",
            rxjs: "rxjs",
            lodash: "lodash",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            Tether: "tether",
            "window.Tether": "tether",
            Popper: ['popper.js', 'default'],
            Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
            Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
            Button: "exports-loader?Button!bootstrap/js/dist/button",
            Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
            Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
            Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
            Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
            Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
            Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
            Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
            Util: "exports-loader?Util!bootstrap/js/dist/util"
        }),
        new ForkTsCheckerWebpackPlugin(),
        new webpack.IgnorePlugin(/^\.\/locale$/, [/moment$/]),
        new webpack.ContextReplacementPlugin(
            /angular(\\|\/)core(\\|\/)/,
            path.resolve(__dirname, './src')
        ),
        new webpack.LoaderOptionsPlugin({
            // test: /\.xxx$/, // may apply this only for some modules
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
        })
    ]
};