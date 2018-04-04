import * as express from "express";
import * as fs from "fs";
import * as path from "path";
import * as passport from "passport";
import * as Auth from "./passport";
import * as session from "express-session";
import * as sessionFileStore from "session-file-store";
import * as bodyParser from "body-parser";
import chalk from "chalk";
import { apiRouter } from "./api";
import { printWelcome } from "./welcome";

var FileStore = sessionFileStore(session);
var Config = require("./config");
var FileUtils = require("./file-utils");

async function run() {
  printWelcome();

  Auth.initLocalStrategy();

  var app = express();
  var port = process.env.PORT || 8080;
  var config = await Config.load();

  app.use(require("morgan")("dev"));
  app.use(require("cookie-parser")());
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
  app.use("/api", apiRouter());
  if (fs.existsSync(config.public)) {
    app.use(express.static(config.public));
  } else {
    console.warn(
      chalk.red('no valid public dir configured under "public" in config.json')
    );
  }

  app.listen(port);
  console.log(
    `Blog Service is listening on port ${chalk.cyan(port.toString())} :)`
  );
}

run();
