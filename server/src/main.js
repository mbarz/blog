var express = require("express");
var fs = require("fs");
var path = require("path");

var app = express();

var port = process.env.PORT || 8080;

var router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to my blog");
});

router.get("/posts", (req, res) => {
  readFile("list.json")
    .then(content => JSON.parse(content).posts)
    .then(list =>
      list.map(p => readFile(`${p.id}.md`).then(content => ({ ...p, content })))
    )
    .then(promises => Promise.all(promises))
    .then(result => res.send(result))
    .catch(err => res.status(500).send({ error: "not able to read posts" }));
});
app.use("/api", router);

app.listen(port);
console.log(`Blog Service is listening on port ${port}`);

function readFile(f) {
  const filePath = path.join(__dirname, "..", "posts", f);
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) {
        console.log("not able to read " + f);
        reject(err);
      } else resolve(content);
    });
  });
}
