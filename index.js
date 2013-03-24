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
var Sources = require('./server/Sources.js');

var youtubeSource = new Sources.YoutubeSource();

var parties = new Array();

//Mobile api calls
app.get('/api/:hash/:action', function(req, res){
	if(typeof(parties[req.params.hash]) !== 'undefined'){
		if(req.params.action == 'getPlaylist'){
			res.send(JSON.stringify(parties[req.params.hash].playlist.list));
		} else {
			res.send('{"error": "Action not implemented"}');
		}
	} else {
		res.send('{"error": "No party with such hash was found"}');
	}
});

app.post('/api/:hash/:action', function(req, res){
	if(typeof(parties[req.params.hash]) !== 'undefined'){
		if(req.params.action == 'up'){
			parties[req.params.hash].playlist.vote(req.body.id);
			res.send('{"ack": true}');
		} else if(req.params.action == 'search'){
			if(typeof(req.body.q) !== 'undefined'){
				var n = (typeof(req.body.n) !== 'undefined') ? req.body.n : 5;
				youtubeSource.search(req.body.q, n, function(sResult){
					res.send(JSON.stringify(sResult));
				});
			} else {
				res.send('{"error": "no search query"}');
			}
		} else {
			res.send('{"error": "Action not implemented"}');
		}
	} else {
		res.send('{"error": "No party with such hash was found"}');
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
			party.playlist.addSong(new Song('Rickrolld', 'youtube', 'oHg5SJYRHA0'));
			party.playlist.addSong(new Song('Hysteria', 'url', '/song.mp3'));
			party.playlist.addSong(new Song('Rickrolld', 'youtube', 'w8KQmps-Sog'));
			
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
		
		if(typeof(party) !== 'undefined'){
			party.sockets.splice(party.sockets.indexOf(socket), 1);
			
			console.log('disconnected');
		}
	});
  
});