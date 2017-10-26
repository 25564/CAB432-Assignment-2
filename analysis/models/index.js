"use strict";

const Sequelize = require('sequelize');

const config = require(`${__dirname}/../config.json`)['database'];
const sequelize = new Sequelize(config);

const models = {};
const modules = [
  require('./tweet'),
  require('./noun'),
];

// Initialize Models
modules.forEach((module) => {
  const model = module(sequelize, Sequelize, config);
  models[model.name] = model;
});

// Apply Associations
Object.keys(models).forEach((key) => {
  if ('associate' in models[key]) models[key].associate(models);
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

module.exports = models;