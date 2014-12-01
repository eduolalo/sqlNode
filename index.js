#!/usr/bin/env node

process.chdir(__dirname);
console.log('Project path: ', process.cwd());   

// 3th party libraries
var express = require('express'),
    session = require('express-session');

// Local libraries
var willy = require('./lib/willy'),
    config = require('./config');


// Initialize app
var app = new willy.App({
    basepath: __dirname
});

app.use(require('body-parser')());
app.use(require('method-override')());
app.use(require('multer')());
app.use(require('cookie-parser')(config.cookie));

// Cross domain
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});


// conect mysql
var dataBase = require('./lib/dataBase');

dataBase.sequelize.sync().success(function() {
    var v1 = require(process.cwd() + '/resources/v1/events');

    console.log('Init v1');
    v1.init(app);
    
    // Error handlers
    app.get('*', function(req, res, next) {
        var err = new Error();
        err.status = 404;
        next(err);
    });

    app.use(function(err, req, res, next) {
        if(err.status == 404) {
            res.status(404).send({error: req.url+' not found'});
        } else {
            res.status(err.status || 500).send({error: err.stack});
        }
    });

    console.log('Server listening port: ',config.port);
    app.listen(config.port);
});
