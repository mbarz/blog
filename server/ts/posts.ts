import * as express from 'express';
import * as path from 'path';
import * as Config from './config';
import * as FileUtils from './file-utils';
var leftPad = require('left-pad');
import * as Auth from './passport';
import { FileBasedBlogStorage } from './blog-storage';

export const router = express.Router();

const storage = new FileBasedBlogStorage();

router.get('/', async (req, res) => {
  storage
    .findAll()
    .then(all => res.send(all))
    .catch(err => res.status(500).send({ error: 'not able to read posts' }));
});

router.get('/:id', (req, res) => {
  const id = req.params.id;
  storage
    .findById(id)
    .then(post => res.send(post))
    .catch(err => res.status(500).send({ message: 'not able to load post' }));
});

router.post('/', Auth.isAuthenticated, (req, res) => {
  const data = req.body;
  if (data.title && data.date && data.content) {
    storage
      .create(data)
      .then(id => res.send({ id, ...data }))
      .catch(err => {
        console.error(err);
        res.status(500).send('internal server error');
      });
  } else {
    res.status(422).send('invalid data');
  }
});

router.put('/:id', Auth.isAuthenticated, (req, res) => {
  const data = req.body;
  if (data.title && data.date && data.content && data.id) {
    storage
      .update(data)
      .then(() => res.send(data))
      .catch(err => {
        console.error(err);
        res.status(500).send('internal server error');
      });
  } else {
    res.status(422).send('invalid data');
  }
});

router.delete('/:id', Auth.isAuthenticated, (req, res) => {
  storage
    .delete(req.params.id)
    .then(() => res.send({ message: 'deleted ' + req.params.id }))
    .catch(err => {
      console.error(err);
      res.status(500).send('internal server error');
    });
});
