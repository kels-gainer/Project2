var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Meme.findAll({}).then(function(dbMemes) {
      res.render("index", { dbMemes: dbMemes });
    });
  });

  //post request to our db so get request below does something.
  app.get("/myMemes", function(req, res) {
    db.Meme.findAll({}).then(function(dbMemes) {
      console.log(dbMemes);
      res.render("myMemes", { dbMemes: dbMemes, test: "Test" });
    });
  });

  app.get("/createMemes", function(req, res) {
    res.render("createMemes", { test: "Test" });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
