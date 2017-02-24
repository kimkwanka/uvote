/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import { createInitialStore } from './store';

export default function serverRenderer() {
  return (req, res, next) => {
    const state = req.user ? { user: { name: req.user.username } } : { user: { name: null } };
    const store = createInitialStore(state);

    match({ routes: getRoutes(store), location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const appHtml = renderToString(
          <Provider store={store}>
            <RouterContext {...props} />
          </Provider>,
        );
        res.status(200).render('index', { content: appHtml, preloadedState: store.getState(), title: 'uVote' });
      } else {
        next(); // Let Express handle all other routes
      }
    });
  };
}
