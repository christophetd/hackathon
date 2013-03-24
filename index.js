var express = require('express');
var app = express()
	, http = require('http')
	, server = http.createServer(app)
	, io = require('socket.io').listen(server);
	
var port =  process.env.PORT || 5000;

//Keeps track of bonds between app's hash and api's hash
var hashPairs = new Array();
//Holds every party going on
var parties = new Array();

app.configure(function(){
    app.set('port', port);
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
	app.use(express.cookieParser());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
	
	app.get('/', function(req, res, next){
		if(typeof(req.cookies.partyHash) !== 'undefined'){
			res.redirect('/app/');
		} else {
			next();
		}
	});
	
	app.get('/start', function(req, res, next){
		
		//Creating a new key pair
		var apiKey;
		do{
			apiKey = Math.random().toString(36).substr(2, 34);
		} while(typeof(hashPairs[apiKey]) !== 'undefined');
		
		var appKey;
		do{
			appKey = Math.random().toString(36).substr(2, 34);
		} while(hashPairs.indexOf(appKey) !== -1);
		
		hashPairs[apiKey] = appKey;
		
		//Creating a new party
		var party = {
			playlist: new Playlist(),
			sockets: new Array(),
			appKey: appKey,
			apiKey: apiKey,
			serialize: function(){
				return {
					playlist: this.playlist.list,
					apiKey: this.apiKey
				};
			}
		};
		
		parties[appKey] = party;
		party.playlist.addSong(new Song('Rickrolld', 'youtube', 'oHg5SJYRHA0'));
		party.playlist.addSong(new Song('Hysteria', 'url', '/song.mp3'));
		party.playlist.addSong(new Song('Rickrolld', 'youtube', 'w8KQmps-Sog'));
		
		console.log("Creating new party with appKey : "+appKey);
		
		res.cookie('partyHash', appKey);
		res.redirect('/app/');
	});
});

server.listen(app.get('port'), function() {
	console.log("server running and listening on port "+port);
});




var Song = require('./server/Song.js');
var Playlist = require('./server/Playlist.js');
var Sources = require('./server/Sources.js');

var youtubeSource = new Sources.YoutubeSource();


//Mobile api calls
app.get('/api/:hash/:action', function(req, res){
	var appKey = hashPairs[req.params.hash];
	
	if(typeof(appKey) !== 'undefined'){
		if(typeof(parties[appKey]) !== 'undefined'){
			if(req.params.action == 'getPlaylist'){
				res.send(JSON.stringify(parties[appKey].playlist.list));
			} else {
				res.send('{"error": "Action not implemented"}');
			}
		} else {
			res.send('{"error": "No party with such hash was found"}');
		}
	} else {
		res.send('{"error": "No matching pair found"}');
	}
});

app.post('/api/:hash/:action', function(req, res){
	var appKey = hashPairs[req.params.hash];
	
	if(typeof(appKey) !== 'undefined'){
		if(typeof(parties[appKey]) !== 'undefined'){
			if(req.params.action == 'up'){
				parties[appKey].playlist.vote(req.body.id);
				res.send('{"ack": true}');
			} else if(req.params.action == 'search'){
				//Search for new music in sources
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
	} else {
		res.send('{"error": "No matching pair found"}');
	}
});


//Desktop app
io.sockets.on('connection', function (socket) {
	
	var party;
	
	function onPlaylistUpdate(){
		socket.emit('playlist_update', party.playlist.list);
	}

	socket.on('party_init', function(hash){
		party = parties[hash];
		if(typeof(party) === 'undefined'){
			console.log("Error : user tried to init a party with invalid app hash");
			socket.emit('error', 'invalid hash');
			
		} else {
			console.log("Using existing party with hash : "+hash);
			
			party.sockets.push(socket);
			console.log(party);
			socket.emit('party_initialized', party.serialize());
			party.playlist.on('updated', onPlaylistUpdate);
		}
	}).on('party_close', function(){
		
		delete parties[party.appKey];
		
		console.log('closed');
		
	}).on('playlist_getNext', function(){
		socket.emit('playlist_next', party.playlist.read());
	}).on('disconnect', function(){
		
		if(typeof(party) !== 'undefined'){
			party.sockets.splice(party.sockets.indexOf(socket), 1);
			
			party.playlist.removeListener('updated', onPlaylistUpdate);
			console.log('disconnected');
		}
	});
  
});