var socket = io.connect('/');

var playlist = new PlaylistView(socket);
var player = new Player(socket, playlist);


socket.on('error', function(msg){
	if(msg == 'invalid hash'){
		window.location.href = '/end';
	} else if(msg == 'socket already init'){
	
	} else if(msg == 'other instance took control'){
	
	} else {
		//TODO : unhandeled error
	}
});

socket.emit("party_init", getCookie('partyHash'));




