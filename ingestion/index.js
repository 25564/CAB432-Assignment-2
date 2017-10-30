"use strict";


const Twitter = require('twitter');
const request = require('request-promise');

const client = new Twitter({
  consumer_key: 'sAQgWb50UaFAWxiAyLmpjAo3O',
  consumer_secret: '4792aPVVd3t58akY9LVSB6Q3WTfW46VCtJ9FaqWyJZQJXSbVRx',
  access_token_key: '737803614551310336-7LJvltNeAywxNAQxeRSJdiRS70CTorw',
  access_token_secret: 'puTPcI2yWKtWdT9It5Sa66N2IRqqf72XlNb1I2szrW6JB',
});

const stream = client.stream('statuses/filter', {
    track: 'a, b, c, d, e, f, g, h, i, j, k, l, m, n, o, p, q, r, s, t, u, v, w, x, y, z',
});

stream.on('data', tweetData => {
    const RequestOptions = {
        method: 'POST',
        uri: 'http://ec2-54-206-41-143.ap-southeast-2.compute.amazonaws.com:3000',
        body: {
            tweet: tweetData.text,
        },
        json: true
    };
     
    request(RequestOptions)
    .then(parsedBody => {
        console.log(parsedBody);
    })
    .catch(err => {
        console.log(err);
    });
});

stream.on('error', error => {
  console.log(error);
});