#!/usr/bin/env node

process.chdir(__dirname);
console.log('Project path: ', process.cwd());   

// 3th party libraries
var express = require('express'),
    session = require('express-session'),
    Sequelize = require('sequelize');

// Local libraries
var willy = require('./lib/willy'),
    conf = require('./conf');

// conect mysql
var db = conf.mySQL.db,
    dbPass = conf.mySQL.pass,
    dbUser = conf.mySQL.user,
    dbHost = conf.mySQL.host;
var sequelize = new Sequelize(db, dbUser, dbPass, {
    host: dbHost
});

