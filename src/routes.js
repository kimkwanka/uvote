/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import Dashboard from './components/dashboard';

const routes = (
  <Route path="/" component={Layout} >
    <IndexRoute component={Home} />
    <Route path="/account/:username" component={Dashboard} />
  </Route>
);

export default routes;
