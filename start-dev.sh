#!/bin/sh

export FACEBOOK_APP_ID='597969390251431'
export FACEBOOK_APP_SECRET='54a6b160db81be26c1fda2bea1638812'
export TWITTER_CONSUMER_KEY='9r0gFcxsQw7OakfeKXlCxA'
export TWITTER_CONSUMER_SECRET='WQU3gUaZo5neHgmP2Fgdn152yqg2rCZiqvkg1827I'
mongod &
nodemon -L app.js &
grunt &