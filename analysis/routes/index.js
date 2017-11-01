"use strict";

const router = require('express').Router();
const sentiment = require('sentiment');
const WordPOS = require('wordpos');
const Sequelize = require('sequelize');

const models = require('../models');
const config = require(`../config.json`)['database'];
const sequelize = new Sequelize(config);

const getNouns = text => {
  const wordpos = new WordPOS();
  
  return new Promise(resolve => {
    wordpos.getNouns(text, function(result){
      resolve(result);
    });
  });
}

router.get('/data', (req, res) => {
  Promise.all([
    sequelize.query('SELECT noun, AVG(sentiment), COUNT(sentiment), (AVG(sentiment)*(LOG(COUNT(sentiment)))) as Weighted '
                  + 'FROM "Nouns" as nountable WHERE "createdAt" >= NOW() - INTERVAL \'5 minutes\' AND noun NOT IN (SELECT word FROM "BannedWords") '
                  + 'GROUP BY noun ORDER by Weighted DESC LIMIT 25', { 
      type: sequelize.QueryTypes.SELECT 
    }),
    sequelize.query('SELECT noun, AVG(sentiment), COUNT(sentiment), (AVG(sentiment)*(LOG(COUNT(sentiment)))) as Weighted '
                  + 'FROM "Nouns" as nountable WHERE "createdAt" >= NOW() - INTERVAL \'5 minutes\' AND noun NOT IN (SELECT word FROM "BannedWords") '
                  + 'GROUP BY noun ORDER by Weighted ASC LIMIT 25', { 
              type: sequelize.QueryTypes.SELECT 
              }),
  ])
  .then(data => res.json(data)).catch(err => console.log(err));
});


router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
  res.json({
    alive: true,
  });
});

module.exports = router;