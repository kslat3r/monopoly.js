#!/bin/bash

git checkout master
git pull
git add .
git commit -m "Deploy"
git push heroku master