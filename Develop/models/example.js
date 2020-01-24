// module.exports is exposing an object as a function. Which takes a variable and defines what the text and description are and returns the defined variable.

module.exports = function(sequelize, DataTypes) {
  var Example = sequelize.define("Example", {
    text: DataTypes.STRING,
    description: DataTypes.TEXT
  });
  return Example;
};
