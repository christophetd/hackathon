var socket = io.connect('/');

var urlSource = new URLSource();

var current = 0;
socket.on('party_initialized', function (data) {
	console.log("Initialized");
	function play(song) {
		urlSource.buildSong(song);
		$media = song.play($('#media-container'), true);

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

		$media.bind('ended', function() {{
			socket.emit("playlist_getNext");
		}});
	}
	socket.emit("playlist_getNext");
	socket.on("playlist_next", function(response) { play(response); });

});

socket.emit("party_init", "hqhq");




