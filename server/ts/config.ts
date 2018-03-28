import * as fs from 'fs';
import * as path from 'path';
import * as FileUtils from './file-utils';

var loaded = undefined;

export function load() {
  if (loaded) return loaded;
  console.log('loading config from file');
  var filePath = path.join(__dirname, '..', 'config.json');
  loaded = FileUtils.readFile(filePath).then(content => JSON.parse(content));
  return loaded;
}
