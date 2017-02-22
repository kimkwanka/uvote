/* eslint-disable react/jsx-filename-extension */
require('babel-register')({
   presets: [ 'es2015', 'react' ],
});
const serverRenderer = require('./server.render.js').default;

const express = require('express');
const path = require('path');

const app = express();

const PORT = process.env.PORT || 8080;

// Enable Pug Templating engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// Enable Webpack Hot Reload
webpackDevHelper = require('./hot.dev.js');
webpackDevHelper.useWebpackMiddleware(app);

// Serve static assets when in production
//app.use(express.static(path.join(__dirname, '../public')));

// Handle server-side React + React-Routes as Express middleware
app.use(serverRenderer());

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT}`);
});


/*
process.on('SIGTERM', () => {
    httpServer.close(() => {
        process.exit(0);
    });
});*/