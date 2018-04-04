import * as express from "express";
import * as passport from "passport";
import * as Auth from "./passport";

export function apiRouter() {
  const router = express.Router();
  router.get("/", (req, res) => {
    res.send("Welcome to the API for my blog");
  });

  router.get("/login", (req, res) => res.redirect("/login.html"));

  router.post(
    "/login",
    (req, res, next) => {
      var options: any = {};
      if (req.body.failureRedirect)
        options.failureRedirect = req.body.failureRedirect;
      passport.authenticate("local", options)(req, res, next);
    },
    (req, res) => {
      if (req.body.successRedirect) res.redirect(req.body.successRedirect);
      else res.send({ msg: "Successfully logged in" });
    }
  );

  router.get("/logout", (req, res) => {
    req.logout();
    res.send({ isAuthenticated: req.isAuthenticated() });
  });

  router.get("/loggedIn", (req, res) => {
    res.send({ isAuthenticated: req.isAuthenticated() });
  });

  router.get("/profile", Auth.isAuthenticated, (req, res) => {
    res.send(req.user);
  });

  router.use("/posts", require("./posts").router);
  return router;
}
