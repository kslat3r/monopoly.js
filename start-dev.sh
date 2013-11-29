#!/bin/sh

mongod &
nodemon -L app.js &
grunt &