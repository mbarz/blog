var fs = require('fs');

function readFile(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) return reject(err);
      else return resolve(content);
    });
  });
}

exports.readFile = readFile;
