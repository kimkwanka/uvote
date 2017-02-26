/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import { getInitialStore } from './store';

const store = getInitialStore();

// Use style-loader for dev
// eslint-disable-next-line
require('!style-loader!css-loader!stylus-loader!./css/style.styl');
// ---------------- TODO: ---------------
// Only require and let ExtractTextPlugin write a .css file in production
// require("./css/style.styl");

store.subscribe(() => {
  console.log('Changed:', store.getState());
});

const xtraProps = {
  renderRouteComponent: child => (
    React.cloneElement(child, { auth: store.getState().user.name !== null })
  ),
};

render(
  <Provider store={store}>
    <Router routes={getRoutes(store)} history={browserHistory} render={applyRouterMiddleware(xtraProps)} />
  </Provider>
  ,
document.getElementById('app'));
