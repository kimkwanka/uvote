const dev = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
// const fs = require('fs');

// const SERVER_BUILD_DIR = path.resolve(__dirname, './');
const CLIENT_BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'src/');

const configClient = {
  entry: dev ? {
    client: [path.join(APP_DIR, 'client.js'), 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
  } : {
    client: path.join(APP_DIR, 'client.js'),
  },
  devtool: dev ? 'inline-sourcemap' : false,
  output: {
    path: CLIENT_BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: dev ? ['react-hot-loader', 'babel-loader'] : ['babel-loader'],
      },
      {
        test: /\.styl$/,
        loader: dev ? ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'] : ExtractTextPlugin.extract([{ loader: 'css-loader', options: { minimize: true } }, 'postcss-loader', 'stylus-loader']),
      },
    ],
  },
  plugins: dev ? [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.DefinePlugin({    // Needed for React production-ready version
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin({ filename: 'style.css', allChunks: true }),
  ],
};
/*
const configServer = {
  name: 'server',
  entry: path.join(APP_DIR, 'server.js'),

  output: {
    path: SERVER_BUILD_DIR,
    libraryTarget: 'commonjs2',     // Or else module.exports will be empty {}
    filename: 'server.bundle.js',
  },

  target: 'node',

  // keep node_module paths out of the bundle
  externals: fs.readdirSync(path.resolve(__dirname, 'node_modules')).concat([
    'react-dom/server', 'react/addons',
  ]).reduce((ext, mod) => {
    const tmp = ext;
    tmp[mod] = `commonjs ${mod}`;
    return tmp;
  }, {}),

  node: {
    __filename: true,
    __dirname: true,
  },

  module: {
    loaders: [
      {
        test: /\.js$/, exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015&presets[]=react'
      },
    ],
  },
};
*/
module.exports = [configClient];
