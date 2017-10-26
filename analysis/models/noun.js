"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Noun', {
    noun: DataTypes.STRING,
    sentiment: DataTypes.INTEGER
  });
};
