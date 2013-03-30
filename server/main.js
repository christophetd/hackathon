

var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);


//Getting port from environment, defaults to 5000
var port = process.env.PORT || 5000;
app.set('port', port);

//Configures the application
require('./config.js')(app);

//Declares every routes
require('./router.js')(app);




server.listen(app.get('port'), function() {
	console.log("server running and listening on port "+port);
});