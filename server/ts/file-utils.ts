import * as fs from 'fs';

export function readFile(filePath) {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, content) => {
      if (err) return reject(err);
      else return resolve(content);
    });
  });
}

export function writeFile(filePath, content) {
  return new Promise<void>((resolve, reject) => {
    fs.writeFile(filePath, content, err => {
      if (err) return reject(err);
      else return resolve();
    });
  });
}
