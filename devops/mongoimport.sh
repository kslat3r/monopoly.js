#!/bin/bash

mongorestore -h paulo.mongohq.com:10090 -u remote --password $1 -d app19861741 db/dump/monopolyjs/