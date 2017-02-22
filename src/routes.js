/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import Layout from './components/layout';
import Home from './components/home';
import SignIn from './components/signin';
import SignUp from './components/signup';

const routes = (
  <Route path="/" component={Layout} >
    <IndexRoute component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Route>
);

export default routes;
