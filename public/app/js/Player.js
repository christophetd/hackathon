function Player(socket, playlist, localFiles) {
	var _this = this;
	this.playlist = playlist;
	var source;

	_this.play = function(song) {
		switch(song.type) {
			case "youtube": 
				source = new YoutubeSource();
				break;

			case "url": 
				source = new URLSource();
				break;
			
			case "local":
				source = new LocalSource(localFiles);
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

	socket.emit("party_init", getCookie('partyHash'));
}