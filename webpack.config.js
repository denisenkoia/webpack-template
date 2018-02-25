const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  cache: true,
  watch: true,
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
        test: /\.scss$/,
        exclude: /main\.scss/,
        use: [
            {
                loader: 'style-loader'
            }, 
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: false,
                    sourceMap: true
                }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')({
                    remove: false, 
                    browsers: ['last 50 versions'] 
                  })
                ]
              }
            }, 
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
          ]
      },
      {
        test: /main\.scss/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
                loader: 'css-loader',
                options: {
                    url: false,
                    minimize: false,
                    sourceMap: true
                }
            },
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: true,
                plugins: [
                  require('autoprefixer')({
                    remove: false, 
                    browsers: ['last 50 versions'] 
                  })
                ]
              }
            },
            {
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            }
          ]
        })
      },
      {
        test: /\.vue$/,
        use:[
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
      },
      {
        test: /\.html$/,
        use: ['html-loader', 'markup-inline-loader']
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('assets/css/main.css')
  ]
};