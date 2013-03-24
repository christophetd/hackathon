function PlaylistView(socket) {
	var _this = this;
	this.list = [];

	socket.on('playlist_update', function(newPlaylist) {
		console.log(newPlaylist);
		_this.set(newPlaylist);
	});

	this.set = function(data) {
		_this.list = data;
		_this.refresh($('#playlist-container'));
	}

	this.refresh = function($container) {
		$container.empty();
		$l = $('<ol>').appendTo($container);
		for(var i in _this.list) {
			$('<li>').html(_this.list[i].name+" ("+_this.list[i].score+" votes)").appendTo($l);
		}
	}

}