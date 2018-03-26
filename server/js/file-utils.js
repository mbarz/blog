var fs = require("fs");

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, "utf8", (err, content) => {
      if (err) return reject(err);
      else return resolve(content);
    });
  });
}

function writeFile(filePath, content) {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) return reject(err);
      else return resolve();
    });
  });
}

exports.readFile = readFile;
exports.writeFile = writeFile;
