/* global document */
/* eslint-disable react/jsx-filename-extension */
/* eslint-disable import/no-webpack-loader-syntax*/

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './modules/routes';

// Use style-loader for dev
require('!style-loader!css-loader!stylus-loader!./css/style.styl');
// Only require and let ExtractTextPlugin write a .css file in production
// require("./css/style.styl");

render(
  <Router routes={routes} history={browserHistory} />,
document.getElementById('app'));
