/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */

import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import { Provider } from 'react-redux';
import getRoutes from './routes';
import { hydrateStore } from './store';
import Store from './db';

const cssLink = (process.env.NODE_ENV !== 'production') ? '' : '/style.css';

export default function serverRenderer() {
  return (req, res, next) => {
    Store.findOne((dbErr, dbStore) => {
      // eslint-disable-next-line
      if (dbErr) return console.log(dbErr);
      const polls = dbStore ? dbStore.polls : [];

      const ip = req.headers['x-forwarded-for'] || req.ip;
      const user = req.user ? { name: req.user.username, ip } : { name: null, ip };

      const store = hydrateStore({ user, polls });

      match({ routes: getRoutes(store), location: req.url }, (matchErr, redirect, props) => {
        if (matchErr) {
          res.status(500).send(matchErr.message);
        } else if (redirect) {
          res.redirect(redirect.pathname + redirect.search);
        } else if (props) {
          const appHtml = renderToString(
            <Provider store={store}>
              <RouterContext {...props} />
            </Provider>,
          );

          res.status(200).render('index', { content: appHtml, preloadedState: store.getState(), title: 'uVote', cssLink });
        } else {
          next(); // Let Express handle all other routes
        }
      });
    });
  };
}
