// required modules
// needs these to connect and communicate to different directories in application
require("dotenv").config();
var express = require("express");
var exphbs = require("express-handlebars");

// required path
// whatever is in the models directory is required
var db = require("./models");

// start of express module
var app = express();
// local port named
var PORT = process.env.PORT || 3000;

// Middleware
// parses incoming request with urlencoded 
app.use(express.urlencoded({ extended: false }));
// parses incoming request with json
app.use(express.json());
// serves static files
app.use(express.static("public"));

// Handlebars
// pinpoints default layout name's handlebars template, where items can be placed
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
app.set("view engine", "handlebars");

// Routes
// shows path for what program needs to run
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
// when test passes, it is ready to go listen to port through next function
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
// When syncOptions past test to true, it syncs db.sequelize to PORT 3000, Console loggin message.
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});
// exports to app
module.exports = app;
