const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const _production = ( process.env.NODE_ENV === 'production' ) ? true : false;


const webpackConfig = {
    mode: ( _production ) ? 'production' : 'development',
    devtool: ( _production ) ? 'none' : 'source-map',
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
                test: /\.scss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            sourceMap: ( _production ) ? false : true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            sourceMap: ( _production ) ? false : true,
                            plugins: [
                                require('autoprefixer')({
                                    remove: false,
                                    browsers: ['ie >= 10', 'last 50 versions']
                                })
                            ]
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: ( _production ) ? false : true
                        }
                    }
                ]
            },
            {
                test: /\.vue$/,
                use: [
                    {
                        loader: 'vue-loader',
                        options: {
                            postcss: [require('autoprefixer')({
                                remove: false,
                                browsers: ['ie >= 10', 'last 50 versions']
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
            '@': path.resolve(__dirname, 'src'),
            '@js': path.resolve(__dirname, 'src/js'),
            '@components': path.resolve(__dirname, 'src/components'),
            'vue$': 'vue/dist/vue.esm.js'
        }
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: 'assets/css/[name].css',
        })
    ]
};


// Production
if ( _production ) {
    // clear
    const clearFiles = ['./src/assets/js/common.js.map', './src/assets/css/main.css.map'];
    for (let file of clearFiles) {
        fs.unlink( path.resolve(__dirname, file), (err) => {
            if (err) {
                console.log(`${file} was not deleted`);
                return;
            }
            console.log(`${file} was deleted`);
        })
    };

    // add production config
    webpackConfig.optimization = {
        minimizer: [
            new UglifyJsPlugin(),
            new OptimizeCSSAssetsPlugin({})
        ]
    };
};

module.exports = webpackConfig;