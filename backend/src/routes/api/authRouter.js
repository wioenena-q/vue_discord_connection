import { Router } from "express";
import passport from "passport";
import { isAuthenticated } from "../../middleware/isAuthenticated.js";

const AuthRouter = Router();
AuthRouter.get("/login", passport.authenticate("discord"));
AuthRouter.get(
  "/redirect",
  passport.authenticate("discord", {
    failureRedirect: "/",
  }),
  (req, res) => res.redirect("/")
);

// GET /me
AuthRouter.get("/me", isAuthenticated, (req, res) => {
  res.send(req.user);
});

// Get /logout
AuthRouter.get("/logout", isAuthenticated, (req, res) => {
  req.session.destroy(() => {
    req.logOut(() => {
      res.clearCookie("wotify_dashboard_connection");
      res.redirect("/");
    });
  });
});

export { AuthRouter };
