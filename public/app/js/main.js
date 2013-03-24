var socket = io.connect('/');

function printPlaylist(playlist) {
	$list = $('#playlist>ol');
	$list.empty();
	for(var i in playlist) {
		$('<li>').html(playlist[i].name).appendTo($list);
	}
}

socket.on('playlist_update', function(newPlaylist) {
	printPlaylist(newPlaylist);
});
socket.on('party_initialized', function (data) {
	var playlist = data.playlist;
	var apiKey = data.apiKey;
	printPlaylist(playlist);
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




