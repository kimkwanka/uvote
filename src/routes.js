/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import Dashboard from './components/dashboard';
import SignIn from './components/signin';
import SignUp from './components/signup';

const routes = (
  <Route path="/" component={Layout} >
    <IndexRoute component={Home} />
    <Route path="/account/:username" component={Dashboard} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Route>
);

export default routes;
