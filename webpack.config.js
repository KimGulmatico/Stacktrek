const path = require('path')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const fs = require('fs')

const WorkboxPlugin = require('workbox-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const lessToJs = require('less-vars-to-js')

const themeVariables = lessToJs(fs.readFileSync(path.join(__dirname, './src/frontend/less/custom-antd.less'), 'utf8'))

require('babel-polyfill')

const config = {
  cache: true,
  entry: ['babel-polyfill', path.join(__dirname, 'src/frontend/index.js')], // Our frontend will be inside the src folder
  output: {
    path: path.join(__dirname, 'public/js'),
    filename: '[name].[chunkHash].js', // The final file will be created in dist/build.js
    chunkFilename: '[name].[chunkHash].js',
  },
  module: {
    rules: [{
      test: /\.css$/, // To load the css in react
      use: ['style-loader', 'css-loader'],
      include: /src/,
    },
    {
      test: /\.(gif|png|jpe?g|svg|ttf)$/i,
      use: [
        'file-loader',
        {
          loader: 'image-webpack-loader',
          options: {
            bypassOnDebug: true,
          },
        },
      ],
    },
    {
      test: /\.jsx?$/, // To load the js and jsx files
      loader: 'babel-loader',
      include: [
        path.resolve(__dirname, 'src/frontend/'),
      ],
      exclude: /node_modules(\/|\\)(?!(@feathersjs))/,
      query: {
        presets: ['env', 'react'],
        plugins: [
          ['import', { libraryName: 'antd', style: true }],
        ],
      },
    }, {
      test: /\.less$/,
      use: [{
        loader: 'style-loader',
      }, {
        loader: 'css-loader',
      }, {
        loader: 'less-loader',
        options: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
          root: path.resolve(__dirname, './'),
        },
      }],
    }],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(['public/js/']),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      title: 'StackTrek',
      template: 'public/index.html',
    }),
    new WorkboxPlugin.GenerateSW({
      swDest: 'public',
      skipWaiting: true,
      clientsClaim: true,
      directoryIndex: path.resolve(__dirname, 'public/js/index.html'),
    }),
  ],
}

if (process.env.NODE_ENV === 'STAGING' || process.env.NODE_ENV === 'PRODUCTION') {
  config.plugins.push(new UglifyJSPlugin())
}
module.exports = config
