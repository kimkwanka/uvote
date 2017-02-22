/* eslint-disable react/jsx-filename-extension */
require('babel-register')({
   presets: [ 'es2015', 'react' ],
});
const serverRenderer = require('./server.render.js').default;

const express = require('express');
const path = require('path');

const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const GitHubStrategy = require('passport-github2').Strategy;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET;

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
passport.use(new GitHubStrategy({
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "http://127.0.0.1:8080/auth/github/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    // asynchronous verification, for effect...
    process.nextTick(function () {      
      return done(null, profile);
    });
  }
));
passport.serializeUser(function(user, done) {
  done(null, user);
});
passport.deserializeUser(function(obj, done) {
  done(null, obj);
});
app.use(session({ secret: '11THIS IS A SECRET STRING AND STUFF FOR HASHING THE SESSION11', resave: false, saveUninitialized: false }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.post('/login',
  passport.authenticate('github', { scope: [ 'user:email' ] }),
  function(req, res){
    // The request will be redirected to GitHub for authentication, so this
    // function will not be called.
  });
app.get('/auth/github/callback', 
  passport.authenticate('github', { failureRedirect: '/' }),
  function(req, res) {
    res.redirect(`/account/${req.user.username}`);
  });

function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) { return next(); }
  res.redirect('/')
}
function ensureUsername(req, res, next) {
  console.log(req.user.username, req.params.username);
  if (req.user.username == req.params.username) { return next(); }
  res.redirect('/')
}

app.get('/account/:username', ensureAuthenticated, ensureUsername, (req, res, next) => {
    next();
});

app.get('/logout', function(req, res){
  req.logout();
  res.redirect('/');
});

// Handle server-side React + React-Routes as Express middleware
app.get('*', serverRenderer());

app.listen(PORT, () => {
  console.log(`Express server running at ${PORT}`);
});


/*
process.on('SIGTERM', () => {
    httpServer.close(() => {
        process.exit(0);
    });
});*/