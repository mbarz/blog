var express = require("express");
var fs = require("fs");
var path = require("path");

function run() {
  var app = express();
  var port = process.env.PORT || 8080;
  var router = express.Router();

  router.get("/", (req, res) => {
    res.send("Welcome to my blog");
  });

  router.get("/posts", (req, res) => {
    var config = loadConfig();
    console.log("config", config);
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
