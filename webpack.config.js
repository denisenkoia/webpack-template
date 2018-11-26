const path = require('path');
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');

// const ExtractTextPlugin = require('extract-text-webpack-plugin');

const _production = ( process.env.NODE_ENV === 'production' ) ? true : false;


const webpackConfig = {
    mode: 'development',
    cache: true,
    devtool: 'source-map',
    entry: ['./src/common.js', './src/scss/main.scss'],
    output: {
        path: path.resolve(__dirname, './src'),
        filename: 'assets/js/common.js'
    },
    devServer: {
        stats: {
            modules: false,
            children: false
        },
        watchContentBase: true,
        contentBase: path.resolve(__dirname, './src'),
        port: 8080
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                use: ['babel-loader']
            },
            {
                test: /main\.scss/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            sourceMap: true
                        }
                    },
                    // {
                    //     loader: 'postcss-loader',
                    //     options: {
                    //         plugins: [
                    //             require("autoprefixer")({
                    //                 browsers: ["ie >= 10", "last 50 version"]
                    //             })
                    //         ]
                    //     }
                    // },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ],
                // use: MiniCssExtractPlugin.loader,

                // use: ExtractTextPlugin.extract({
                //     fallback: 'style-loader',
                //     use: [
                //         {
                //             loader: 'css-loader',
                //             options: {
                //                 url: false,
                //                 minimize: ( _production ) ? true : false,
                //                 sourceMap: ( _production ) ? false : true,
                //             }
                //         },
                //         {
                //             loader: 'postcss-loader',
                //             options: {
                //                 sourceMap: ( _production ) ? false : true,
                //                 plugins: [
                //                     require('autoprefixer')({
                //                         remove: false,
                //                         browsers: ['last 50 versions']
                //                     })
                //                 ]
                //             }
                //         },
                //         {
                //             loader: 'sass-loader',
                //             options: {
                //                 sourceMap: ( _production ) ? false : true
                //             }
                //         }
                //     ]
                // })
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            postcss: [require('autoprefixer')({
                                remove: false,
                                browsers: ['last 50 versions']
                            })]
                        }
                    },
                    {
                        loader: 'markup-inline-loader'
                    }
                ]
            }
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: "assets/css/[name].css",
            chunkFilename: "[id].css"
        }),
        // new ExtractTextPlugin('assets/css/main.css')
    ]
};


// Production
if ( _production ) {
    webpackConfig.plugins = ( webpackConfig.plugins || [] ).concat([
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.optimize.UglifyJsPlugin()
    ])
}

module.exports = webpackConfig