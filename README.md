# CAB432 Assignment 2 - 2017

I built a simple service to sit inside a auto scaling group behind a load balancer on AWS. The goal of the assignment is to demonstrate auto scaling and I did this by ingesting a Twitter stream and running sentiment analysis on the tweet before scraping nouns and other keywords. These keywords and tweets are stored with their relevant sentiment in a Postgres Database where they can be queried at will.

In this example I was querying the average weighted sentiment of each word in the last 5 minutes then using this to build a simple top 25 list of the words most likely to be used in a postiive/negative context.

