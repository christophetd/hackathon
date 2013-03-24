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
		if(typeof(req.cookies.partyHash) !== 'undefined' && req.cookies.partyHash !== ''){
			res.redirect('/app/');
		} else {
			next();
		}
	});
	
	app.get('/end', function(req, res, next){
		res.cookie('partyHash', '');
		res.redirect('/');
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
			socket: null,
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

var VOTE_TIMEOUT = 120;

var lockIpVote = (function(){
	var locks = new Array();
	
	return function(ip, id){
		if(typeof(locks[ip]) === 'undefined'){
			locks[ip] = {
				time: new Date(),
				lastVotes: new Array()
			};
			locks[ip].lastVotes[0] = id;
		} else {
			if(new Date().getSeconds() - locks[ip].time.getSeconds() >= VOTE_TIMEOUT){
				locks[ip].time = new Date();
				locks.lastVotes = new Array();
			}
			
			if(locks[ip].lastVotes.indexOf(id) == -1){
				locks[ip].lastVotes.push(id);
			} else {
				return 'you can not vote for the same music twice in so little time';
			}
		}
		return false;
	};
})();

var Song = require('./server/Song.js');
var Playlist = require('./server/Playlist.js');
var Sources = require('./server/Sources.js');

var youtubeSource = new Sources.YoutubeSource();
var localSource = new Sources.LocalSource();

function checkSong(item){
	return (typeof(item.id) !== 'undefined'
		&& typeof(item.name) !== 'undefined'
		&& typeof(item.type) !== 'undefined'
		&& typeof(item.data) !== 'undefined'
		&& typeof(item.score) !== 'undefined');
}

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
				var err = lockIpVote(req.ip, req.body.id);
				if(err === false){
					parties[appKey].playlist.vote(req.body.id);
					res.send('{"ack": true}');
				} else {
					res.send('{"error": "'+err+'"}');
				}
			//SEARCH
			} else if(req.params.action == 'search'){
				if(typeof(req.body.q) !== 'undefined'){
					var n = (typeof(req.body.n) !== 'undefined') ? req.body.n : 5;
					
					var completeness = 0;
					var data = new Array();
					
					function complete(chunk){
						completeness++;
						data = data.concat(chunk);
						if(completeness == 2){
							res.send(JSON.stringify(data));
						}
					}
					
					youtubeSource.search(req.body.q, n, function(sResult){
						complete(sResult);
					}, parties[appKey]);
					
					localSource.search(req.body.q, n, function(sResult){
						complete(sResult);
					}, parties[appKey]);
				} else {
					res.send('{"error": "no search query"}');
				}
			//ADD
			} else if(req.params.action == 'add'){
				if(typeof(req.body.item) !== 'undefined'){
					var item = req.body.item;
					console.log(item);
					if(checkSong(item)){
						console.log('hqhq');
						parties[appKey].playlist.addSong(item);
					} else {
						res.send('{"error": "invalid song"}');
					}
				} else {
					res.send('{"error": "no songb to add"}');
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

	socket.on('party_init', function(hash, force){
		party = parties[hash];
		if(typeof(party) === 'undefined'){
			console.log("Error : user tried to init a party with invalid app hash");
			socket.emit('error', 'invalid hash');
			
		} else {
			console.log("Using existing party with hash : "+hash);
			
			function doInit(){
				party.socket = socket;
				socket.emit('party_initialized', party.serialize());
				party.playlist.on('updated', onPlaylistUpdate);
			}
			
			if(party.socket != null){
				if(force !== true){
					console.log('socket already assigned and not force');
					socket.emit('error', 'socket already init');
				} else {
					party.socket.emit('error', 'other instance took control');
					doInit();
				}
			} else {
				doInit();
			}
		}
	}).on('party_close', function(){
		
		delete parties[party.appKey];
		
		console.log('closed');
		
	}).on('playlist_getNext', function(){
		socket.emit('playlist_next', party.playlist.read());
	}).on('disconnect', function(){
		
		if(typeof(party) !== 'undefined'){
			party.socket = null;
			
			party.playlist.removeListener('updated', onPlaylistUpdate);
			console.log('disconnected');
		}
	});
  
});