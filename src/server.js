/* eslint-disable react/jsx-filename-extension */
/* eslint-disable consistent-return */
/* eslint-disable no-console */
/* eslint-disable global-require */

const serverRenderer = require('./server.render.js').default;

let webpackDevHelper = null;
if (process.env.NODE_ENV !== 'production') {
  webpackDevHelper = require('./hot.dev.js');
}
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const FileStore = require('session-file-store')(session);
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;

const PORT = process.env.PORT || 8080;
const clientID = process.env.GITHUB_CLIENT_ID;
const clientSecret = process.env.GITHUB_CLIENT_SECRET;
const callbackURL = process.env.GITHUB_CALLBACK_URL || 'http://127.0.0.1:8080/auth/github/callback';

const ensureAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/');
};

const Store = require('./db');

const app = express();

app.use(session({
  store: new FileStore(),
  secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11',
  resave: false,
  saveUninitialized: false,
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
// Enable Pug Templating engine
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'pug');

// Enable Webpack Hot Reload in dev
if (process.env.NODE_ENV !== 'production') {
  webpackDevHelper.useWebpackMiddleware(app);
} else {
  app.use(express.static(path.join(__dirname, '../public')));
}

passport.use(new GitHubStrategy({ clientID, clientSecret, callbackURL },
  (accessToken, refreshToken, profile, done) => {
    process.nextTick(() => done(null, profile));
  },
));
passport.serializeUser((user, done) => (done(null, user)));
passport.deserializeUser((obj, done) => (done(null, obj)));

app.get('/login', passport.authenticate('github', { scope: ['user:email'] }));
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
  res.redirect('/dashboard');
});
app.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
app.get('/dashboard', ensureAuthenticated, (req, res, next) => {
  next();
});

app.put('/save', (req, res) => {
  //eslint-disable-next-line
  Store.findOneAndUpdate({}, { $set: { polls: req.body } }, { upsert: true, new: true }, (dbErr, newStore) => {
    if (dbErr) {
      res.status(500).send(dbErr);
      console.log(dbErr);
    } else {
      res.send('Saved successfully');
    }
  });
});

app.get('*', serverRenderer());

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT} in ${process.env.NODE_ENV || 'dev'} mode`);
});

/*
process.on('SIGTERM', () => {
    httpServer.close(() => {
        process.exit(0);
    });
});*/
