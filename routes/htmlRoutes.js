var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Meme.findAll({}).then(function(dbMemes) {
      res.render("index", { dbMemes: dbMemes });
    });
  });

  //post request to our db so get request below does something.
  // app.get("/myMemes", function(req, res) {
  //   db.Meme.findAll({}).then(function(dbMemes) {
  //     console.log(dbMemes);
  //     res.render("myMemes", { dbMemes: dbMemes, test: "Test" });
  //   });
  // });

  //GET request to find all options for current user
  app.get("/myMemes/:uID", function(req, res) {
    // Find All Memes with the uID that match the passed req.params.id and return them as res.json
    db.Meme.findAll({
      where: {
        uID: req.params.uID
      }
    }).then(function(dbMemes) {
      //res.json(dbMeme);
      res.render("myMemes", { dbMemes: dbMemes });
      //displayMemes(dbMeme);
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
