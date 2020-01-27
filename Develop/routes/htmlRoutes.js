// what directory is needed
var db = require("../models");

module.exports = function(app) {
  // Load index page
  // uses handlebars to render message and examples from database in the index file
  app.get("/", function(req, res) {
    // tells what to get in what directory "/" then starts function
    db.Example.findAll({}).then(function(dbExamples) {
      // if finds all in database Example
      res.render("index", {
        msg: "Welcome!",
        examples: dbExamples
      // in column examples in database Examples, it displays message "Welcome" on the "index.html" 
      });
    });
  });

  // Load example page and pass in an example by id
  // This looks through the example database and finds one example by id
  app.get("/example/:id", function(req, res) {
    // where to search directory, what to search for
    db.Example.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      // looks through database Example, searches for one example in the column of id
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
