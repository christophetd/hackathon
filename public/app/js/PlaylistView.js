function PlaylistView(socket) {
	_this = this;
	this.list = [];

	socket.on('playlist_update', function(newPlaylist) {
		alert("Updating playlist");
		console.log(newPlaylist);
		_this.set(newPlaylist);
		_this.refresh($('#playlist-container'));
	});

	this.set = function(data) {
		_this.list = data;
	}

	this.refresh = function($container) {
		$container.empty();
		$l = $('<ol>').appendTo($container);
		for(var i in _this.list) {
			$('<li>').html(_this.list[i].name+" ("+_this.list[i].score+" votes)").appendTo($l);
		}
	}

}