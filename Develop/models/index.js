"use strict";

// These are modules needed to work with file system

// use to read files on your computer
var fs = require("fs");

// makes way to working with directories
var path = require("path");

// promise based orm, which converts data between incompatible systems
var Sequelize = require("sequelize");

// return filename part of a file path
var basename = path.basename(module.filename);

// makes the server run for a certain environment
var env = process.env.NODE_ENV || "development";

// filename with path in a variable
var config = require(__dirname + "/../config/config.json")[env];

// variable db is an object
var db = {};


// If prepares server to be developer or production, else configures database, username, password
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}


// filters .js files from specific directories
fs.readdirSync(__dirname)
  .filter(function(file) {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  // for each element in an array, ?????? imports path of directory and file names
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });
// whatever the keys are in the array are associated to db
Object.keys(db).forEach(function(modelName) {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// exports to the database
module.exports = db;
