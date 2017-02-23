/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import { getInitialStore } from './store';

const store = getInitialStore();
// Use style-loader for dev
require('!style-loader!css-loader!stylus-loader!./css/style.styl');
// Only require and let ExtractTextPlugin write a .css file in production
// require("./css/style.styl");

store.subscribe(() => {
  console.log('Changed:', store.getState());
});

render(
  <Provider store={store}>
    <Router routes={routes} history={browserHistory} />
  </Provider>
  ,
document.getElementById('app'));
