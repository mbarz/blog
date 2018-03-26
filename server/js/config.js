var fs = require('fs');
var path = require('path');
var FileUtils = require('./file-utils');

var loaded = undefined;

function load() {
  if (loaded) return loaded;
  console.log('loading config from file');
  var filePath = path.join(__dirname, '..', 'config.json');
  loaded = FileUtils.readFile(filePath).then(content => JSON.parse(content));
  return loaded;
}

exports.load = load;
