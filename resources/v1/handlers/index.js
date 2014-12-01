var handler = require(process.cwd() + '/lib/handler');

module.exports = handler.extend({
    read: function(req, res) {
        console.log(req.app);
        res.status(200).json({
            data: {
                message: 'Some important data'
            }
        });
    }
});
