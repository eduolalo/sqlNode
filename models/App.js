module.exports = function(sequelize, dataTypes) {

    var App = sequelize.define('App', {
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        accessKey: dataTypes.STRING,
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        }
    });

    App.hook('beforeCreate', function(app, next) {
        app.accessKey = App.generateToken();
        app.active = true;
        next();
    });

    return App;
};
