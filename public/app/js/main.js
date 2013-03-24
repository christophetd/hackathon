var socket = io.connect('/');


socket.on('party_initialized', function (data) {
	console.log(data);
	console.log("Initialized");
	var source;
	function play(song) {
		switch(song.type) {
			case "youtube": 
			source = new YoutubeSource();
				break;

			case "url": 
			source = new URLSource();

			default: 
				console.log("Type error");
		}

		source.buildSong(song, function() {
			console.log("Ended");
			socket.emit("playlist_getNext");
		});
		$media = song.play($('#media-container'));

		// Preloading
		/*var interval = setInterval(function() {
			var currentTime = song.getCurrentTime();
			var totalTime = song.getDuration();
			console.log(totalTime-currentTime);
			if(totalTime - currentTime < 5) {
				alert("Preloading !");
				socket.emit("playlist_getNext");
				socket.on("playlist_next", function(response) {
					console.log("========= Loading from socket");
					console.log(response);
					var nextSong = response;
					$mediaNextSong = urlSource.buildSong(nextSong);
					nextSong.play($('#preloading'), false);
				});
				clearInterval(interval);
			}
		}, 2000);*/
	}
	socket.emit("playlist_getNext");
	socket.on("playlist_next", function(response) { play(response); });

});

socket.emit("party_init", "hqhq");




