var express = require("express");
var fs = require("fs");
var path = require("path");
var passport = require("passport");
var Auth = require("./passport");
var session = require("express-session");
var sessionFileStore = require("session-file-store");

var FileStore = sessionFileStore(session);

var Config = require("./config");

async function run() {
  Auth.initLocalStrategy();

  var app = express();
  var port = process.env.PORT || 8080;
  var router = express.Router();
  var config = await Config.load();

  app.use(require("morgan")("combined"));
  app.use(require("cookie-parser")());
  app.use(require("body-parser").urlencoded({ extended: true }));
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

  router.get("/", (req, res) => {
    res.send("Welcome to the API for my blog");
  });

  router.get("/login", (req, res) => res.redirect("/login.html"));

  router.post(
    "/login",
    (req, res, next) => {
      var options = {};
      if (req.body.failureRedirect)
        options.failureRedirect = req.body.failureRedirect;
      passport.authenticate("local", options)(req, res, next);
    },
    (req, res) => {
      if (req.body.successRedirect) res.redirect(req.body.successRedirect);
      else res.send({ msg: "Successfully logged in" });
    }
  );

  router.get("/profile", Auth.isAuthenticated, (req, res) => {
    res.send(req.user);
  });

  router.get("/posts", (req, res) => {
    var config = loadConfig();
    readFile(path.join(config.posts, "list.json"))
      .then(content => JSON.parse(content).posts)
      .then(list =>
        list.map(p =>
          readFile(path.join(config.posts, `${p.id}.md`)).then(content => ({
            ...p,
            content
          }))
        )
      )
      .then(promises => Promise.all(promises))
      .then(result => res.send(result))
      .catch(err => res.status(500).send({ error: "not able to read posts" }));
  });
  app.use("/api", router);

  app.listen(port);
  console.log(`Blog Service is listening on port ${port}`);
}

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        console.log("not able to read " + filePath);
        reject(err);
      } else resolve(content);
    });
  });
}

function loadConfig() {
  const config = JSON.parse(
    fs.readFileSync(path.join(__dirname, "..", "config.json"), "utf8")
  );
  return config;
}

run();
