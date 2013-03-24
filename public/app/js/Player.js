function Player(socket, playlist) {
	_this = this;
	this.playlist = playlist;

	socket.on('party_initialized', function (data) {
		var playlist = data.playlist;
		var apiKey = data.apiKey;
		var source;
		_this.playlist.set(data.playlist);
		_this.playlist.refresh($('#playlist-container'));

		_this.play = function(song) {
			switch(song.type) {
				case "youtube": 
				source = new YoutubeSource();
					break;

				case "url": 
				source = new URLSource();
					break;

				default: 
					console.log("Type error ("+song.type+")");
			}

			source.buildSong(song, function() {
				console.log("Ended");
				socket.emit("playlist_getNext");
			});
			$media = song.play($('#media-container'));
		}
		socket.emit("playlist_getNext");
		socket.on("playlist_next", function(response) { _this.play(response); });

	});

	socket.on('error', function(msg){
		if(msg == 'invalid hash'){
			setCookie('partyHash', '', 0);
			window.location.href = '/end';
		} else if(msg == 'socket already init'){
		
		} else if(msg == 'other instance took control'){
		
		} else {
			//TODO : unhandeled error
		}
	});

	socket.emit("party_init", getCookie('partyHash'));

	socket.on("error", function(msg) {
		if(msg == "invalid hash") {
			setCookie('partyHash', '', -1);
			window.location.href = "/";
		}
	})
}