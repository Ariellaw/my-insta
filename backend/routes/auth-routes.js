const LocalStrategy = require("passport-local").Strategy;
const userService = require("../services/userService.js");
var flash = require("connect-flash");

function addAuthRoutes(app, passport) {
  app.post(
    "/login",
    passport.authenticate("local", {
      // successRedirect: "/#/home",
      failureRedirect: "/#/login?faliure=falure"
      //   failureFlash: true,
      //   successFlash: "Welcome!"
    }),
    function(req, res) {
      res.redirect("/#/user/" + req.user.userName);
    }
  );

  app.get("/logout", function(req, res) {
    req.logout();
    res.redirect("/");
  });
}

module.exports = addAuthRoutes;
