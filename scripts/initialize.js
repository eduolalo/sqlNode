#!/usr/bin/env node

var dataBase = require(process.cwd() + '/lib/dataBase'),
    sequelize = dataBase.sequelize;

var writeData = function() {

    var Manager = dataBase.Manager,
        App = dataBase.App;

    // Create manager
    var manager = Manager.build({
        name: 'Christian',
        email: 'rcchristian@gmail.com'
    });
    manager.save().success(function() {
        console.log('Manager created: ', manager);

        // Create app
        var app = App.build({
            name: 'Initial app'
        });
        app.save().success(function() {
            console.log('App created: ', app);

            // Setting assosiations
            manager.setApps([app]).success(function() {
                console.log('Initial values created!');
            });

        }).error(function(appError) {
            console.log('Cant create app: ', appErr);
        });

    }).error(function(managerErr) {
        console.log('Cant create manager: ', managerErr);
    });
}

sequelize.sync().success(writeData);
