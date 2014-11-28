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
    host: dbHost,
    dialect: 'mysql'
});

sequelize.authenticate().then(function(err) {
    console.log('Database connection success');
}, function(err) {
    console.log('Cant connect to database', err);
});

// Initialize app
var app = willy.App();

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('multer')());
app.use(require('cookie-parser'));

// Cross domain
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

var v1 = require(process.cwd() + '/resources/v1/events');
