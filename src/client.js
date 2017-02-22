/* global document */
/* eslint-disable react/jsx-filename-extension */

// Use style-loader for dev
require("!style-loader!css-loader!stylus-loader!./css/style.styl");
// Only require and let ExtractTextPlugin write a .css file in production
//require("./css/style.styl");

import React from 'react';
import { render } from 'react-dom';
import { Router, browserHistory } from 'react-router';

import routes from './modules/routes';

render(
  <Router routes={routes} history={browserHistory} />,
document.getElementById('app'));
