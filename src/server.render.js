import React from 'react';
import { renderToString } from 'react-dom/server';
import { match, RouterContext } from 'react-router';
import routes from './routes';

const express = require('express');

export default function serverRenderer() {
  return (req, res, next) => {
    match({ routes, location: req.url }, (err, redirect, props) => {
      if (err) {
        res.status(500).send(err.message);
      } else if (redirect) {
        // we haven't talked about `onEnter` hooks on routes, but before a
        // route is entered, it can redirect. Here we handle on the server.
        res.redirect(redirect.pathname + redirect.search);
      } else if (props) {
        const appHtml = renderToString(<RouterContext {...props} />);        
        res.status(200).render('index',{content: appHtml,title: 'uVote',});
      } else {
        res.status(404).send('Not Found');
      }
    });    
  }
};
