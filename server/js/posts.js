var express = require('express');
var path = require('path');
var Config = require('./config');
var FileUtils = require('./file-utils');

var router = express.Router();

router.get('/', async (req, res) => {
  try {
    const list = await getList();
    const promises = list.map(p =>
      getPostContent(p.id).then(content => ({
        ...p,
        content
      }))
    );
    const result = await Promise.all(promises);
    res.send(result);
  } catch (err) {
    res.status(500).send({ error: 'not able to read posts' });
  }
});

router.get('/:id', (req, res) =>
  Promise.resolve()
    .then(async () => {
      const id = req.params.id;
      const list = await getList();
      const post = list.find(p => p.id === id);
      if (!post) {
        const validIds = list.map(item => item.id);
        const message = `post ${id} not found`;
        return res.status(404).send({ message, validIds });
      }
      const content = await getPostContent(id);
      res.send({ ...post, content });
    })
    .catch(err => res.status(500).send({ message: 'not able to load post' }))
);

function getPostContent(id) {
  return Config.load()
    .then(config => path.join(config.posts, `${id}.md`))
    .then(filePath => FileUtils.readFile(filePath));
}

function getList() {
  return Config.load()
    .then(config => path.join(config.posts, 'list.json'))
    .then(filePath => FileUtils.readFile(filePath))
    .then(content => JSON.parse(content).posts);
}

exports.router = router;
