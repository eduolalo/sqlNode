module.exports = function(sequelize, dataTypes) {
    var App = sequelize.import('./App'); 

    var Manager = sequelize.define('Manager', {
        name: {
            type: dataTypes.STRING,
            allowNull: false
        },
        email: {
        	type: dataTypes.STRING,
        	isEmail: true,
            allowNull: false,
            unique: true
        },
        active: {
            type: dataTypes.BOOLEAN,
            defaultValue: true
        },
        accessToken: {
            type: dataTypes.STRING
        }
    });

    Manager.hook('beforeCreate', function(manager, next) {
        manager.accessToken = Manager.generateToken();
        next();
    });

    Manager.hasMany(App, {
        as: 'Apps'
    });

    return Manager;
};
