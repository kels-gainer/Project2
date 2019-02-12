require("dotenv").config();
var db = require("../models");
// var $ = require("jquery");
var axios = require("axios");
var MemeKey = require("../public/js/keys.js");
module.exports = function(app) {
  // Using btnPop to get API request from Memegenerator
  app.get("/api/btnPop", function(req, res) {
    var n = Math.floor(Math.random() * 20) + 1;
    var queryURL =
      "http://version1.api.memegenerator.net//Instances_Select_ByPopular?languageCode=en&pageIndex=" +
      n +
      "&days=&apiKey=" +
      MemeKey.apiKey;
    axios.get(queryURL).then(function(response) {
      // console.log(response.data.result);
      res.send(response.data.result);
    });
    // .catch(function(error) {
    //   if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
    //   } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an object that comes back with details pertaining to the error that occurred.
    //     console.log(error.request);
    //   } else {
    //     // Something happened in setting up the request that triggered an Error
    //     console.log("Error", error.message);
    //   }
    //   console.log(error.config);
    // });
  });

  //GET request to find all options for current user
  app.get("/api/:uID", function(req, res) {
    // Find All Memes with the uID that match the passed req.params.id and return them as res.json
    db.Meme.findAll({
      where: {
        uID: req.params.uID
      }
    }).then(function(dbMeme) {
      res.json(dbMeme);
    });
  });

  // Create a new example
  app.post("/api/examples", function(req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function(req, res) {
    db.Example.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
