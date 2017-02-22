/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';

import App from './app';
import Home from './home';
import SignIn from './signin';
import SignUp from './signup';

const routes = (
  <Route path="/" component={App} >
    <IndexRoute component={Home} />
    <Route path="/signin" component={SignIn} />
    <Route path="/signup" component={SignUp} />
  </Route>
);

export default routes;
