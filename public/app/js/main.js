var socket = io.connect('/');

var urlSource = new URLSource();


socket.on('party_state', function (data) {
	console.log(data);
	var song = data.playlist[0];
	
	urlSource.buildSong(song);
	
	console.log('playing song');
	//song.play($('#container'));
});

socket.emit('party_getState');

