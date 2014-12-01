'use strict';

var Sequelize = require('sequelize'),
    fs = require('fs'),
    config = require(process.cwd() + '/config'),
    path = require('path'),
    willy = require(process.cwd() + '/lib/willy');

var dataBase = {},
    modelsPath = process.cwd() + '/models';

var sequelize = new Sequelize(config.mySQL.db, config.mySQL.user, config.mySQL.pass, {
    host: config.mySQL.host,
    dialect: 'mysql',
    define: {
        charset: 'utf8',
        collate: 'utf8_general_ci',
        classMethods: {
            generateToken: function() {
                return willy.generateToken();
            }
        }
    }
});

var files = fs.readdirSync(modelsPath);

for (var f in files) {
    var file = files[f],
        ext = file.split('.')[1];

    if (ext !== 'js'){
        continue;
    }
    var model = sequelize.import(path.join(modelsPath, file));
    dataBase[model.name] = model;
}

Object.keys(dataBase).forEach(function(modelName) {
    if ('associate' in dataBase[modelName]) {
        dataBase[modelName].associate(dataBase);
    }
});

dataBase.sequelize = sequelize;
dataBase.Sequelize = Sequelize;

module.exports = dataBase;
