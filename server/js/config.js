var fs = require("fs");
var path = require("path");

function load() {
  return new Promise((resolve, reject) => {
    fs.readFile(
      path.join(__dirname, "..", "config.json"),
      "utf8",
      (err, content) => {
        if (err) return reject(err);
        else return resolve(JSON.parse(content));
      }
    );
  });
}

exports.load = load;
