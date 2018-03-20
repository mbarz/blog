var express = require("express");
var fs = require("fs");

var app = express();

var port = process.env.PORT || 8080;

var router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my blog");
});

router.get("/posts", (req, res) => {
  readFile("../public/posts/list.json")
    .then(content => JSON.parse(content).posts)
    .then(list =>
      list.map(p =>
        readFile(`../public/posts/${p.id}.md`).then(text => ({ ...p, text }))
      )
    )
    .then(promises => Promise.all(promises))
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ error: "not able to read posts" }));
});
app.use(router);

app.listen(port);
console.log(`Blog Service is listening on port ${port}`);

function readFile(f) {
  return new Promise((resolve, reject) => {
    fs.readFile(f, "utf8", (err, content) => {
      if (err) {
        console.log("not able to read " + f);
        reject(err);
      } else resolve(content);
    });
  });
}
