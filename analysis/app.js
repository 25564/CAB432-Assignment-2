"use strict";

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');


const sentiment = require('sentiment');
const models = require('./models');
const WordPOS = require('wordpos');

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

const getNouns = text => {
  const wordpos = new WordPOS();
  
  return new Promise(resolve => {
    wordpos.getNouns(text, function(result){
      resolve(result);
    });
  });
}

app.post('/', (req, res) => {
  const tweet = {};

  tweet.text = req.body.tweet;
  tweet.sentiment = sentiment(tweet.text);

  getNouns(tweet.text).then(nouns => 
    Promise.all([
      models.Tweet.create({ tweet: tweet.text, sentiment: tweet.sentiment.score }),
      models.Noun.bulkCreate(nouns.map(noun => ({
        noun: noun.toLowerCase(),
        sentiment: tweet.sentiment.score,
      })))
    ])
  ).then(ReturnData => {
    res.json({
      success: true,
      entry: ReturnData,
    });
  });
});

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