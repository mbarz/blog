var express = require("express");
var path = require("path");
var Config = require("./config");
var FileUtils = require("./file-utils");
var leftPad = require("left-pad");
var Auth = require("./passport");

var router = express.Router();

router.get("/", async (req, res) => {
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
    res.status(500).send({ error: "not able to read posts" });
  }
});

router.get("/:id", (req, res) =>
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
    .catch(err => res.status(500).send({ message: "not able to load post" }))
);

router.post("/", Auth.isAuthenticated, (req, res) => {
  const data = req.body;
  if (data.title && data.date && data.content) {
    create(data)
      .then(id => res.send({ id, ...data }))
      .catch(err => {
        console.error(err);
        res.status(500).send("internal server error");
      });
  } else {
    res.status(422).send("invalid data");
  }
});

router.put("/:id", Auth.isAuthenticated, (req, res) => {
  const data = req.body;
  if (data.title && data.date && data.content && data.id) {
    update(data)
      .then(() => res.send(data))
      .catch(err => {
        console.error(err);
        res.status(500).send("internal server error");
      });
  } else {
    res.status(422).send("invalid data");
  }
});

router.delete("/:id", Auth.isAuthenticated, (req, res) => {
  deletePost(req.params.id)
    .then(() => res.send({ message: "deleted " + req.params.id }))
    .catch(err => {
      console.error(err);
      res.status(500).send("internal server error");
    });
});

async function deletePost(id) {
  return getList().then(list => {
    if (!list.find(item => item.id === id)) throw new Error("not found");

    list = list.filter(item => {
      return item.id !== id;
    });

    return Config.load().then(config => {
      var listFile = path.join(config.posts, "list.json");

      return FileUtils.writeFile(
        listFile,
        JSON.stringify({ posts: list }, null, 2)
      );
    });
  });
}

async function update(data) {
  return getList().then(list => {
    if (!list.find(item => item.id === data.id)) throw new Error("not found");

    list = list.map(item => {
      if (item.id === data.id)
        return { id: data.id, date: data.date, title: data.title };
      else return item;
    });

    return Config.load().then(config => {
      var contentFile = path.join(config.posts, `${data.id}.md`);
      var listFile = path.join(config.posts, "list.json");

      return Promise.all([
        FileUtils.writeFile(contentFile, data.content),
        FileUtils.writeFile(listFile, JSON.stringify({ posts: list }, null, 2))
      ]);
    });
  });
}

async function create(data) {
  console.log("creating new post");
  return getList().then(list => {
    var id = generateId(list);
    list.unshift({ id, title: data.title, date: data.date });

    return Config.load().then(config => {
      var contentFile = path.join(config.posts, `${id}.md`);
      var listFile = path.join(config.posts, "list.json");

      return Promise.all([
        FileUtils.writeFile(contentFile, data.content),
        FileUtils.writeFile(listFile, JSON.stringify({ posts: list }, null, 2))
      ]).then(() => id);
    });
  });
}

function generateId(list) {
  var id = Math.max(...list.map(item => Number.parseInt(item.id))) + 1;
  id = leftPad(id, 3, 0);
  return id;
}

function getPostContent(id) {
  return Config.load()
    .then(config => path.join(config.posts, `${id}.md`))
    .then(filePath => FileUtils.readFile(filePath));
}

function getList() {
  return Config.load()
    .then(config => path.join(config.posts, "list.json"))
    .then(filePath => FileUtils.readFile(filePath))
    .then(content => JSON.parse(content).posts);
}

exports.router = router;
