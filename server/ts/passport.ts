import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import * as Config from "./config";

export function initLocalStrategy() {
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

  passport.serializeUser((user: { name: string }, cb) => {
    cb(null, user.name);
  });

  passport.deserializeUser((name, cb) => {
    return cb(null, { name });
  });
}

export function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  else res.status(403).send("Forbidden");
}

export function authenticate(username, password) {
  return Config.load().then(config => {
    if (!config.users) {
      return undefined;
    }
    const user = config.users.find(u => u.name === username);
    if (user && user.password === password) return user;
    else return undefined;
  });
}
