module.exports.init = function(app) {
    app.on({
        'all /': require('../operations/index');
    });
    
};
