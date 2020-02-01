const path = require('path');

// clean out build directories on each build
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

// include the js minification plugin
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// include the css extraction and minification plugins
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

//serve in watch mode
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const devMode = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: './js/index.min.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      // perform js babelization on all .js files
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      // compile all .scss files to plain old css
      {
        test: /\.(sass|scss|css)$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader', 'resolve-url-loader',
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }]
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 100000
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // clean out build directories on each build
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['./js/*','./css/*']
    }),
    // extract css into dedicated file
    new MiniCssExtractPlugin({
      filename: './css/style.min.css'
    }),
    // enable the css minification plugin
    new OptimizeCSSAssetsPlugin({}),
    // browse to http://localhost:3000/ during development
    new BrowserSyncPlugin({
      server: { baseDir: ['dist'] },
      host: 'localhost',
      port: 3000,
    })
  ],
  optimization: {
    minimizer: [
      // enable the js minification plugin
      new UglifyJSPlugin({
        cache: true,
        parallel: true
      })
    ]
  },
  mode : devMode ? 'development' : 'production'
};