var db = require("../models");

module.exports = function(app) {
  // Load index page
  // uses handlebars to render message and examples from database in the index file
  app.get("/", function(req, res) {
    db.Example.findAll({}).then(function(dbExamples) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      });
    });
  });

  // Load example page and pass in an example by id
  // This looks through the example database and finds one example by id
  app.get("/example/:id", function(req, res) {
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render("example", {
        example: dbExample
      });
    });
  });

  // Render 404 page for any unmatched routes
  // if there is a route not listed, it gives an error code
  app.get("*", function(req, res) {
    res.render("404");
  });
};
