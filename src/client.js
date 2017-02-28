/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/
/* eslint-disable no-unused-vars*/
/* eslint-disable global-require */

import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import { getHydratedStore } from './store';

const store = getHydratedStore();

// Use style-loader for dev
if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line
  require('!style-loader!css-loader!stylus-loader!./css/style.styl');
} else {
  require('./css/style.styl');
}


store.subscribe(() => {
  axios.put('/save', store.getState().polls).then((res) => {
    // console.log('RESPONSE:', res);
  }).catch((err) => {
    // console.log(err);
  });
});

// Give routes access to our store for authentication checking
render(
  <Provider store={store}>
    <Router routes={getRoutes(store)} history={browserHistory} />
  </Provider>
  ,
document.getElementById('app'));
