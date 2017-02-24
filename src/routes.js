/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { IndexRoute, Route } from 'react-router';
import Layout from './components/layout';
import Home from './components/home';
import Dashboard from './components/dashboard';
import Vote from './components/vote';
// export getRoutes function instead of simple JSX to access redux store in checkAuth
const getRoutes = (store) => {
  const reqAuth = (nextState, replace, callback) => {
    const auth = store && store.getState().user.name !== null;
    if (!auth) {
      replace('/');
    }
    callback();
  };
  const findPoll = (username, question) => {
    let index = -1;
    if (store && store.getState().polls !== []) {
      store.getState().polls.forEach((p, i) => {
        if (p.question === question && p.author === username) {
          index = i;
        }
      });
    }
    return index;
  };
  const reqPoll = (nextState, replace, callback) => {
    const username = nextState.params.username;
    const question = decodeURIComponent(nextState.params.question);
    if (findPoll(username, question) === -1) {
      replace('/');
    }
    callback();
  };
  return (
    <Route path="/" component={Layout} >
      <IndexRoute component={Home} />
      <Route path="/dashboard" component={Dashboard} onEnter={reqAuth} />
      <Route path="/poll/:username/:question" component={Vote} onEnter={reqPoll} />
    </Route>
  );
};

export default getRoutes;
