"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Tweet', {
    tweet: DataTypes.STRING,
    sentiment: DataTypes.INTEGER
  });
};
