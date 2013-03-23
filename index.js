var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);
	
var port =  process.env.PORT || 5000;


app.use(express.static(__dirname + '/public'));

app.listen(port);

console.log("server running and listening on port "+port);



//	TEST SETUP

var Song = require('./server/Song.js');

io.sockets.on('connection', function (socket) {
	socket.on('party_getState', function (data) {
		socket.emit('party_state', {
			playlist: [
				new Song('Testygaga - one big fat test', 'url', '/song.wma')
			]
		});
		console.log(data);
	});
  
});