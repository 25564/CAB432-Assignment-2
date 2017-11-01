"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');

const models = require('./models');

models.sequelize.sync({ force: false })
  .then(() => {
    console.log('Database Synchronised Successfully!');
  }, (err) => {
    console.log('Unable to Synchronise Database:', err);
  });

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('view engine', 'pug');

app.use('/', require('./routes'));

app.use(function(req, res, next) {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({ message: err.message, error: err });
  });
}

app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ message: err.message, error: {} });
});

module.exports = app;