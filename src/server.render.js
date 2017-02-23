import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { createInitialStore, getInitialStore} from './store';

const express = require('express');

export default function serverRenderer() {
  return (req, res, next) => {
    
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {       
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        let store;
        let state = {
          user: {
              loggedIn: false,
              name: null,
            }
        };
        if(req.user){
          state = {
            user: {
              loggedIn: true,
              name: req.user.username,
            }
          }
        }
        store = createInitialStore(state);

        const appHtml = renderToString(<Provider store={store}><RouterContext {...props} /></Provider>);
        res.status(200).render('index',{content: appHtml, preloadedState:store.getState(), title: 'uVote',});
      } else {
        next();
        //res.status(404).send('Not Found');
      }
    });    
  }
};
