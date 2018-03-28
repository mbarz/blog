import * as express from 'express';
import * as fs from 'fs';
import * as path from 'path';
import * as passport from 'passport';
import * as Auth from './passport';
import * as session from 'express-session';
import * as sessionFileStore from 'session-file-store';
import * as bodyParser from 'body-parser';

var FileStore = sessionFileStore(session);
var Config = require('./config');
var FileUtils = require('./file-utils');

async function run() {
  Auth.initLocalStrategy();

  var app = express();
  var port = process.env.PORT || 8080;
  var router = express.Router();
  var config = await Config.load();

  app.use(require('morgan')('dev'));
  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(
    session({
      store: new FileStore({}),
      secret: config.secret,
      resave: true,
      saveUninitialized: true
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  router.get('/', (req, res) => {
    res.send('Welcome to the API for my blog');
  });

  router.get('/login', (req, res) => res.redirect('/login.html'));

  router.post(
    '/login',
    (req, res, next) => {
      var options: any = {};
      if (req.body.failureRedirect)
        options.failureRedirect = req.body.failureRedirect;
      passport.authenticate('local', options)(req, res, next);
    },
    (req, res) => {
      if (req.body.successRedirect) res.redirect(req.body.successRedirect);
      else res.send({ msg: 'Successfully logged in' });
    }
  );

  router.get('/logout', (req, res) => {
    req.logout();
    res.send({ isAuthenticated: req.isAuthenticated() });
  });

  router.get('/loggedIn', (req, res) => {
    res.send({ isAuthenticated: req.isAuthenticated() });
  });

  router.get('/profile', Auth.isAuthenticated, (req, res) => {
    res.send(req.user);
  });

  router.use('/posts', require('./posts').router);
  app.use('/api', router);

  app.listen(port);
  console.log(`Blog Service is listening on port ${port} :)`);
}

run();
