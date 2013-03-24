var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);
	
var port =  process.env.PORT || 5000;


app.configure(function(){
    app.set('port', port);
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
		res.send(JSON.stringify(parties[0].playlist.list));
	} else {
		res.end();
	}
});

app.post('/api/:hash/:action', function(req, res){
	if(req.params.action == 'up'){
		parties[0].playlist.vote(req.body.id);
		res.send('{"ack": true}');
	}
});


//Desktop app
io.sockets.on('connection', function (socket) {
	
	var party;

	socket.on('party_init', function(hash){
		party = parties[hash];
		if(typeof(party) === 'undefined'){
			party = {
				playlist: new Playlist(),
				sockets: new Array(),
				hash: hash
			};
			
			party.sockets.push(socket);
			
			parties[hash] = party;
			party.playlist.addSong(new Song('Testygaga - one big fat test', 'url', '/song.wma'));
			
			console.log("Creating new party with hash : "+hash);
		} else {
			console.log("Using existing party with hash : "+hash);
		}
		
		socket.emit('party_initialized', party.playlist.list);
	}).on('party_close', function(){
		
		delete parties[party.hash];
		
		console.log('closed');
		
	}).on('playlist_getNext', function(){
		socket.emit('playlist_next', party.playlist.read());
	}).on('disconnect', function(){
		
		if(typeof(party !== 'undefined')){
			party.sockets.splice(party.sockets.indexOf(socket), 1);
			
			console.log('disconnected');
		}
	});
  
});