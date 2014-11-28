var express = require.resolve('express'),
	app = express();

app.get('/', function(req, res) {
	res.send('Hola Maricas!');
});

var server = app.listen(3999, function() {
	var host = server.address().address,
		port = server.address().port;

	console.log('listening at http://%s:%s', host, port);

});