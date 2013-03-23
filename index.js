var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);
	
var port =  process.env.PORT || 5000;


app.configure(function(){
    app.set('port', port);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'jade');
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
	
	//Set special header for iframe
	app.get('/app/', function(req, res, next){
		res.setHeader('X-Frame-Options', 'GOFORIT');
		
		next();
	});
});

server.listen(app.get('port'), function() {
	console.log("server running and listening on port "+port);
});




var Song = require('./server/Song.js');
var Playlist = require('./server/Playlist.js');

var parties = new Array();

//Mobile api calls
app.get('/api/:hash/:action', function(req, res){
	
	if(req.params.action == 'getPlaylist'){
		res.send(JSON.stringify(parties[0].playlist));
	} else {
		res.end();
	}
});

app.post('/api/:hash/:action', function(req, res){
	if(req.params.action == 'up'){
		var id = parties[0].playlist.seekSong(req.body.id);
		
		if(id !== -1){
			parties[0].playlist.vote(id);
		} else {
			res.send('{"error": "Id '+id+' could not be found in playlist."}');
		}
	}
});


//Desktop app
io.sockets.on('connection', function (socket) {
	
	var party = {
		playlist: new Playlist(),
		socket: socket
	};
	
	parties.push(party);
	party.playlist.addSong(new Song('Testygaga - one big fat test', 'url', '/song.wma'));
	
	socket.on('party_getState', function (data) {
		socket.emit('party_state', party.playlist);
		console.log(data);
	}).on('playlist_getNext', function(){
		socket.emit('playlist_next', party.playlist.read());
	})
	.on('disconnect', function(){
	
		parties.splice(parties.indexOf(party), 1);
		
		console.log('closed');
	});
  
});