var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
var Config = require("./config");

function initLocalStrategy() {
  passport.use(
    new LocalStrategy(async (username, password, cb) => {
      const user = await authenticate(username, password);
      if (user) {
        return cb(null, user);
      } else {
        return cb(null, false);
      }
    })
  );

  passport.serializeUser((user, cb) => {
    cb(null, user.name);
  });

  passport.deserializeUser((name, cb) => {
    return cb(null, { name });
  });
}

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.status(403).send("Forbidden");
}

function authenticate(username, password) {
  return Config.load().then(config => {
    if (!config.users) {
      return undefined;
    }
    const user = config.users.find(u => u.name === username);
    if (user && user.password === password) return user;
    else return undefined;
  });
}

exports.initLocalStrategy = initLocalStrategy;
exports.isAuthenticated = isAuthenticated;
