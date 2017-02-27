/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/
/* eslint-disable no-unused-vars*/
import React from 'react';
import axios from 'axios';
import { render } from 'react-dom';
import { Router, browserHistory, applyRouterMiddleware } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import { getHydratedStore } from './store';

const store = getHydratedStore();

// Use style-loader for dev
// eslint-disable-next-line
require('!style-loader!css-loader!stylus-loader!./css/style.styl');
// ---------------- TODO: ---------------
// Only require and let ExtractTextPlugin write a .css file in production
// require("./css/style.styl");

store.subscribe(() => {
  axios.put('/save', store.getState().polls).then((res) => {
    // console.log('RESPONSE:', res);
  }).catch((err) => {
    // console.log(err);
  });
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
