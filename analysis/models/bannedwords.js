"use strict";

module.exports = (sequelize, DataTypes) => {
  return sequelize.define('BannedWords', {
    word: DataTypes.STRING,
  });
};
