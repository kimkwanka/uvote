const debug = process.env.NODE_ENV !== 'production';
const webpack = require('webpack');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const fs = require('fs');

const SERVER_BUILD_DIR = path.resolve(__dirname, './');
const CLIENT_BUILD_DIR = path.resolve(__dirname, 'public/');
const APP_DIR = path.resolve(__dirname, 'src/');

const configClient = {
  entry: {
    client: [ path.join(APP_DIR, 'client.js') , 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
    //vendor: ['react', 'react-dom', 'react-router', 'webpack-hot-middleware/client', 'webpack/hot/dev-server'],
  },
  devtool: debug ? 'inline-sourcemap' : null,
  output: {
    path: '/', //CLIENT_BUILD_DIR,    //Needed for hotreload
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loaders: ['react-hot-loader','babel-loader'],
      },
      {
        test: /\.styl$/,
        loader: ExtractTextPlugin.extract( ['css-loader', 'stylus-loader']),
      },
    ],
  },
  plugins: debug ? [
    new webpack.optimize.CommonsChunkPlugin({ 
      name: 'vendor',
      filename: 'vendor.bundle.js',
      minChunks: ({ resource }) => /node_modules/.test(resource),
    }),
    new webpack.HotModuleReplacementPlugin(),
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin({filename: 'style.css', allChunks: true}),
  ],
};
/*
const configServer = {
  name: 'server',
  entry: path.join(APP_DIR, 'server.render.js'),

  output: {
    path: SERVER_BUILD_DIR,
    libraryTarget: 'commonjs2',     // Or else module.exports will be empty {}
    filename: 'srender.bundle.js',
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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader?presets[]=es2015&presets[]=react' },
    ],
  },
};*/

module.exports = [configClient];