var _ = require('underscore');

var config = require(process.cwd() + '/config.js'),
    dataBase = require('./dataBase'),
    Sequelize = dataBase.Sequelize,
    App = dataBase.App,
    Manager = dataBase.Manager;

module.exports = {
    checkApp: function(req, res, next) {
        if (!req.args.accessKey) {
            res.status(400).send({message: 'Credentials are required.'});
            return;
        }

        App.find({
            where: {
                accessKey: req.args.accessKey
            }
        }).success(function(app) {
            req.app = app;
            if (!app) {
                res.status(404).send({message: 'Credentials provided are invalid.'});
                return;
            } else if (req.args.accessToken) {
                var query = {
                    where: Sequelize.and({
                        accessToken: req.args.accessToken
                    }, {
                        active: true
                    })
                };
                if(req.body.registration) query.active = false;

                Manager.find(query, function(err, manager) {
                    if(!manager) {
                        res.status(404).send({message: 'Access token provided are invalid.'});
                    } else {
                        req.currentUser = manager;
                        next();
                    }
                });
            } else {
                next();
            }
        });
    },
    preread: function(req, res) {
        var instance = this;
        if (instance['read']) {
            req['args'] = req.query;
            this.checkApp(req, res, function() {
                instance['read'](req, res);
            });
        }
    },
    precreate: function(req, res) {
        var instance = this;
        if (instance['create']) {
            req['args'] = req.body;
            if ('model' in req.body) {
                req['args'] = JSON.parse(req.body.model);
                delete req.args._id;
                req['body'] = req.args;
            }
            this.checkApp(req, res, function() {
                instance['create'](req, res);
            });
        }
    },
    preupdate: function(req, res) {
        var instance = this;
        if (instance['update']) {
            req['args'] = req.body;
            if ('model' in req.body) {
                req['args'] = JSON.parse(req.body.model);
                delete req.args._id;
                req['body'] = req.args;
            }
            this.checkApp(req, res, function() {
                instance['update'](req, res);
            });
        }
    },
    predestroy: function(req, res) {
        var instance = this;
        if (instance['destroy']) {
            req['args'] = req.query;
            this.checkApp(req, res, function() {
                instance['destroy'](req, res);
            });
        }
    },
    extend: function(object, args) {
        var instance = _.extend(object, this);
        if (args != undefined) {
            instance['settings'] = {
                loginRequired: args.loginRequired || false,
                logoutRequired: args.logoutRequired || false
            }
        }
        return instance;
    }
};
