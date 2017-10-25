"use strict";


const Twitter = require('twitter');

const client = new Twitter({
  consumer_key: 'sAQgWb50UaFAWxiAyLmpjAo3O',
  consumer_secret: '4792aPVVd3t58akY9LVSB6Q3WTfW46VCtJ9FaqWyJZQJXSbVRx',
  access_token_key: '737803614551310336-7LJvltNeAywxNAQxeRSJdiRS70CTorw',
  access_token_secret: 'puTPcI2yWKtWdT9It5Sa66N2IRqqf72XlNb1I2szrW6JB',
});

const stream = client.stream('statuses/filter', { track: 'coffee' });

stream.on('data', tweet => {
    console.log('Recieved');
    console.log(JSON.stringify(tweet.text));
    console.log('\n\n')
});

stream.on('error', error => {
  console.log(error);
});