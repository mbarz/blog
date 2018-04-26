import * as bodyParser from 'body-parser';
import chalk from 'chalk';
import * as cors from 'cors';
import * as express from 'express';
import * as fallback from 'express-history-api-fallback';
import * as session from 'express-session';
import * as fs from 'fs';
import * as passport from 'passport';
import * as path from 'path';
import * as sessionFileStore from 'session-file-store';
import * as compression from 'compression';
import { apiRouter } from './api';
import * as Auth from './passport';
import { printWelcome } from './welcome';

var FileStore = sessionFileStore(session);
var Config = require('./config');
var FileUtils = require('./file-utils');

async function run() {
  printWelcome();

  Auth.initLocalStrategy();

  var app = express();
  var port = process.env.PORT || 8080;
  var config = await Config.load();

  app.use(require('morgan')('dev'));
  app.use(require('cookie-parser')());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(compression());
  app.use(
    session({
      store: new FileStore({
        path: './sessions',
        secret: config.secret
      }),
      secret: config.secret,
      resave: true,
      saveUninitialized: false
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());
  app.use(
    '/api',
    cors({
      origin: true,
      credentials: true
    })
  );
  app.use('/api', apiRouter());

  let publicDir = config.public;

  if (!fs.existsSync(config.public)) {
    if (config.public) {
      console.log(
        chalk.red(
          `invalid public dir configured under "public" in config.json (${
            config.public
          })`
        )
      );
    }
    const fallback = path.resolve(__dirname, '../public');
    if (config.public) console.log('try to use fallback ' + fallback);
    if (fs.existsSync(fallback)) {
      console.log(
        chalk.yellow(
          'serving static files from ' +
            fallback +
            '.\nIf you want to serve another dir, edit config.json param "public"'
        )
      );
      publicDir = fallback;
    }
  }
  if (fs.existsSync(publicDir)) {
    publicDir = path.resolve(publicDir);
    console.log('serving static files from ' + publicDir);
    app.use(express.static(publicDir));
    app.use((req, res, next) => {
      const regex = /\/([^\/]*\.[a-z]{1,4}).*$/;
      const m = req.url.match(regex);
      if (m && m.length > 0) {
        const filePath = path.resolve(publicDir, m[1]);
        fs.exists(filePath, exists => {
          if (exists) {
            res.redirect('/' + m[1]);
          } else res.status(404).send('not found');
        });
      } else next();
    });
    app.use(fallback('index.html', { root: publicDir }));
  } else {
    console.warn(chalk.red('not providing static files'));
  }

  app.listen(port);
  console.log(
    `Blog Service is listening on port ${chalk.cyan(port.toString())} :)`
  );
}

console.log('will start');
run();
