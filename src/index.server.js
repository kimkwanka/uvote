require('babel-register')({
  presets: ['es2015', 'react'],
  plugins: ['transform-decorators-legacy', 'transform-class-properties'],
});
require('./server');
